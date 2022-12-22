import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeSearchKey, getShopifyProducts, actionLoadMoreShopifyProducts } from '../actions/actionShopify';

interface ShopifyImage {
  src: string;
  width: number;
  height: number;
}

export interface ProductItem {
  id: number | string;
  title: string;
  link: string;
  image: ShopifyImage;
  price: string[];
  cursor: string;
}

interface DataItem {
  products: ProductItem[];
  statusRequest: Status;
  statusLoadmore: Status;
  lastCursor: string;
  hasNextPage: boolean;
  message: string;
}

interface State {
  data: Record<string, DataItem>;
  searchKey: string;
}

type Actions = ActionTypes<typeof getShopifyProducts | typeof actionLoadMoreShopifyProducts | typeof changeSearchKey>;

export const defaultItem: DataItem = {
  message: '',
  products: [],
  statusLoadmore: 'idle',
  statusRequest: 'idle',
  hasNextPage: false,
  lastCursor: '',
};

const defaultState: State = {
  data: {},
  searchKey: '',
};

let firstTime = true;

const reducerShopify = createReducer<State, Actions>(defaultState, [
  handleAction('@getShopifyProducts/request', ({ state }) => {
    const { searchKey } = state;
    if (firstTime) {
      return {
        ...state,
        data: {
          ...state.data,
          [searchKey]: {
            ...(state.data[searchKey] ?? defaultItem),
            statusRequest: 'loading',
          },
        },
      };
    } else {
      return {
        ...state,
        data: {
          ...state.data,
          [searchKey]: {
            ...(state.data[searchKey] ?? defaultItem),
            statusRequest: (state.data[searchKey] ?? defaultItem).products.length ? 'success' : 'loading',
          },
        },
      };
    }
  }),
  handleAction('@getShopifyProducts/success', ({ state, action }) => {
    const { data, hasNextPage, lastCursor } = action.payload;
    const { searchKey } = state;
    firstTime = false;
    return {
      ...state,
      data: {
        ...state.data,
        [searchKey]: {
          ...(state.data[searchKey] ?? defaultItem),
          statusRequest: 'success',
          products: data,
          hasNextPage,
          lastCursor,
        },
      },
    };
  }),
  handleAction('@getShopifyProducts/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { searchKey } = state;
    return {
      ...state,
      data: {
        ...state.data,
        [searchKey]: {
          ...(state.data[searchKey] ?? defaultItem),
          statusRequest: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@loadMoreShopifyProducts/request', ({ state }) => {
    const { searchKey } = state;
    return {
      ...state,
      data: {
        ...state.data,
        [searchKey]: {
          ...(state.data[searchKey] ?? defaultItem),
          statusLoadmore: 'loading',
        },
      },
    };
  }),
  handleAction('@loadMoreShopifyProducts/success', ({ state, action }) => {
    const { data, hasNextPage, lastCursor } = action.payload;
    const { searchKey } = state;

    return {
      ...state,
      data: {
        ...state.data,
        [searchKey]: {
          ...(state.data[searchKey] ?? defaultItem),
          products: (state.data[searchKey] ?? defaultItem).products.concat(data),
          statusLoadmore: 'success',
          hasNextPage,
          lastCursor,
        },
      },
    };
  }),
  handleAction('@loadMoreShopifyProducts/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { searchKey } = state;

    return {
      ...state,
      data: {
        ...state.data,
        [searchKey]: {
          ...(state.data[searchKey] ?? defaultItem),
          message,
          statusLoadmore: 'failure',
        },
      },
    };
  }),
  handleAction('@Shopify/changeSearchKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
]);

export default reducerShopify;
