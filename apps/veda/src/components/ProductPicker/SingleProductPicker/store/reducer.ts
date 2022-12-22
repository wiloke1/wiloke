import { SingleProductPickerResult } from '../types';

interface SetProduct {
  type: '@SetProduct';
  payload: {
    data: SingleProductPickerResult;
  };
}

export type Actions = SetProduct;

interface State {
  product: SingleProductPickerResult;
}

export const defaultState: State = {
  product: undefined,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case '@SetProduct': {
      return {
        ...state,
        product: action.payload.data,
      };
    }
    default:
      return state;
  }
};
