import { SettingCollectionPicker } from 'types/Schema';

interface SetInitialCollection {
  type: '@SetInitialCollection';
  payload: {
    data: SettingCollectionPicker['children'];
  };
}

export type Actions = SetInitialCollection;

interface State {
  collection: SettingCollectionPicker['children'];
}

export const defaultState: State = {
  collection: undefined,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case '@SetInitialCollection': {
      return {
        ...state,
        collection: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
