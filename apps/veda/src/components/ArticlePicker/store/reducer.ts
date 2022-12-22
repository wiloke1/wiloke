import { ArticlePickerResult } from '../types';

interface SetSettings {
  type: '@ArticlePicker/setSettings';
  payload: {
    value: ArticlePickerResult;
  };
}

export type Action = SetSettings;

interface State {
  value: ArticlePickerResult;
}

export const defaultState: State = {
  value: undefined,
};

export const reducerArticlePicker = (state: State, action: Action): State => {
  switch (action.type) {
    case '@ArticlePicker/setSettings': {
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
