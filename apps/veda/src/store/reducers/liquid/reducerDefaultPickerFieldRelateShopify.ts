import { ArticlePickerResult } from 'components/ArticlePicker/types';
import { BlogPickerResult } from 'components/BlogPicker/types';
import { CollectionPickerResult } from 'components/CollectionPicker';
import { SingleProductPickerResult } from 'components/ProductPicker';
import { getDefaultPickerFieldRelateShopify } from 'store/actions/liquid/actionDefaultPickerFieldRelateShopify';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

interface StateData {
  product: SingleProductPickerResult | 'Không tồn tại' | undefined;
  collection: CollectionPickerResult| 'Không tồn tại'  | undefined;
  blog: BlogPickerResult | 'Không tồn tại' | undefined;
  article: ArticlePickerResult | 'Không tồn tại' | undefined;
}

interface State {
  data: StateData
  statusRequest: Status;
}

type Actions = ActionTypes<typeof getDefaultPickerFieldRelateShopify>;

export const defaultStatePickerFieldRelateShopify: State = {
  data: { article: undefined, blog: undefined, collection: undefined, product: undefined },
  statusRequest: 'idle',
};

export const reducerDefaultPickerFieldRelateShopify = createReducer<State, Actions>(defaultStatePickerFieldRelateShopify, [
  handleAction('@getDefaultPickerFieldRelateShopify/request', ({ state,  }) => {
    return {
      ...state,
      statusRequest: 'loading'
    }
  }),
  handleAction('@getDefaultPickerFieldRelateShopify/success', ({ state, action }) => {
    return {
      ...state,
      statusRequest: 'success',
      data: action.payload
    }
  }),
  handleAction('getDefaultPickerFieldRelateShopify/failure', ({ state }) => {
    return {
      ...state,
      statusRequest: 'failure'
    }
  })
]);

// eslint-disable-next-line prettier/prettier
export type { StateData as DefaultPickerFieldRelateShopifyData };
