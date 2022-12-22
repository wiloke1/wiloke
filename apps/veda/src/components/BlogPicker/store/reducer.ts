import { BlogPickerResult } from '../types';

interface SetSettings {
  type: '@BlogPicker/setSettings';
  payload: {
    value: BlogPickerResult;
  };
}

export type Action = SetSettings;

interface State {
  value: BlogPickerResult;
}

export const defaultState: State = {
  value: undefined,
};

export const reducerBlogPicker = (state: State, action: Action): State => {
  switch (action.type) {
    case '@BlogPicker/setSettings': {
      return {
        ...state,
        value: action.payload.value,
      };
    }
    default: {
      return state;
    }
  }
};
