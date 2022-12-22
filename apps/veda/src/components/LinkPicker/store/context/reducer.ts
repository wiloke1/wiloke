import { PickerType } from 'components/LinkPicker/types';

interface SetSettings {
  type: '@LinkPicker/setSettings';
  payload: {
    value: string;
  };
}
interface SetTypePicker {
  type: '@LinkPicker/setPickerType';
  payload: {
    type: PickerType;
  };
}

export type Action = SetSettings | SetTypePicker;

interface State {
  value: Record<PickerType, string>;
  type: PickerType;
}

export const getDefaultState = (value: string) => {
  return {
    value: {
      custom: value,
      email: value,
      phone: value,
      shopify: value,
    },
    type: 'custom',
  } as State;
};

export const reducerLinkPicker = (state: State, action: Action): State => {
  switch (action.type) {
    case '@LinkPicker/setSettings': {
      return {
        ...state,
        value: {
          ...state.value,
          [state.type]: action.payload.value,
        },
      };
    }
    case '@LinkPicker/setPickerType': {
      return {
        ...state,
        type: action.payload.type,
      };
    }

    default: {
      return state;
    }
  }
};
