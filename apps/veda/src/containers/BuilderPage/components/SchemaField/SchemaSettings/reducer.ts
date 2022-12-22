import { insert } from 'ramda';
import { SchemaSettingField } from 'types/Schema';
import reorder from 'utils/functions/reorder';
import storage from 'utils/functions/storage';
import { CLIPBOARD_OF_SCHEMA_SETTING_IN_LOCAL_STORAGE } from './const';

interface State {
  settings: SchemaSettingField[];
  clipboard: Omit<SchemaSettingField, 'id'> | undefined;
}

interface SetSettings {
  type: '@SchemaSettings/setSettings';
  payload: {
    settings: SchemaSettingField[];
  };
}

export interface SortSetting {
  type: '@SchemaSettings/sortSetting';
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}

export interface AddSetting {
  type: '@SchemaSettings/addSetting';
  payload: {
    newSetting: SchemaSettingField;
  };
}

export interface EditSetting {
  type: '@SchemaSettings/editSetting';
  payload: {
    settingId: SchemaSettingField['id'];
    newData: Partial<Omit<SchemaSettingField, 'id'>>;
  };
}

export interface InsertSetting {
  type: '@SchemaSettings/insertSetting';
  payload: {
    settingId: SchemaSettingField['id'];
    index: number;
    newSetting: SchemaSettingField;
  };
}

export interface DeleteSetting {
  type: '@SchemaSettings/deleteSetting';
  payload: {
    settingId: SchemaSettingField['id'];
  };
}

export interface CopySchemaSetting {
  type: '@SchemaSettings/copySetting';
  payload: {
    settingId: SchemaSettingField['id'];
  };
}

export interface PasteSetting {
  type: '@SchemaSettings/pasteSetting';
  payload: {
    settingId: SchemaSettingField['id'];
    newData: Exclude<State['clipboard'], undefined>;
  };
}

export type Actions = SetSettings | SortSetting | AddSetting | EditSetting | InsertSetting | DeleteSetting | CopySchemaSetting | PasteSetting;
export type OnUpdate = Exclude<Actions, SetSettings>;
export const initialState: State = {
  settings: [],
  clipboard: undefined,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case '@SchemaSettings/setSettings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case '@SchemaSettings/sortSetting': {
      const { sourceIndex, destinationIndex } = action.payload;
      return {
        ...state,
        settings: reorder(state.settings, sourceIndex, destinationIndex),
      };
    }
    case '@SchemaSettings/addSetting': {
      const { newSetting } = action.payload;
      return {
        ...state,
        settings: state.settings.concat(newSetting),
      };
    }
    case '@SchemaSettings/editSetting': {
      const { settingId, newData } = action.payload;
      return {
        ...state,
        settings: state.settings.map(setting => {
          if (setting.id === settingId) {
            return {
              ...setting,
              ...newData,
            } as SchemaSettingField;
          }
          return setting;
        }),
      };
    }
    case '@SchemaSettings/deleteSetting': {
      const { settingId } = action.payload;
      return {
        ...state,
        settings: state.settings.filter(setting => setting.id !== settingId),
      };
    }
    case '@SchemaSettings/insertSetting': {
      const { index, newSetting } = action.payload;
      return {
        ...state,
        settings: insert(index, newSetting, state.settings),
      };
    }
    case '@SchemaSettings/copySetting': {
      const { settingId } = action.payload;
      const sourceSetting = state.settings.find(setting => setting.id === settingId);
      if (sourceSetting) {
        const { id: _, ...sourceSetting_ } = sourceSetting;
        storage.setItem(CLIPBOARD_OF_SCHEMA_SETTING_IN_LOCAL_STORAGE, JSON.stringify(sourceSetting_));
        return {
          ...state,
          clipboard: sourceSetting_,
        };
      }
      return {
        ...state,
        clipboard: undefined,
      };
    }
    case '@SchemaSettings/pasteSetting': {
      const { settingId, newData } = action.payload;
      return {
        ...state,
        settings: state.settings.map(setting => {
          if (setting.id === settingId) {
            return {
              ...setting,
              ...newData,
            } as SchemaSettingField;
          }
          return setting;
        }),
      };
    }
    default:
      return state;
  }
};
