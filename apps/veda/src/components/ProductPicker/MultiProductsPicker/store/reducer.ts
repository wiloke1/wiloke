import { removeDuplicateByKey } from 'utils/functions/removeDuplicate';
import { MultiProductsPickerResult } from '../types';

interface SetProducts {
  type: '@SetProducts';
  payload: {
    data: MultiProductsPickerResult;
  };
}

interface AddProduct {
  type: '@AddProduct';
  payload: {
    product: MultiProductsPickerResult[number];
  };
}

interface DeleteProduct {
  type: '@DeleteProduct';
  payload: {
    productId: MultiProductsPickerResult[number]['id'];
  };
}

export type Actions = SetProducts | AddProduct | DeleteProduct;

interface State {
  products: MultiProductsPickerResult;
}

export const defaultState: State = {
  products: [],
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case '@SetProducts': {
      return {
        ...state,
        products: action.payload.data,
      };
    }
    case '@AddProduct': {
      return {
        ...state,
        products: removeDuplicateByKey(state.products.concat(action.payload.product), 'id'),
      };
    }
    case '@DeleteProduct': {
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.productId),
      };
    }
    default:
      return state;
  }
};
