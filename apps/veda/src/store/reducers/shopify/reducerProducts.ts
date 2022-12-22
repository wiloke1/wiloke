import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getProducts, changeProductKey, loadMoreProducts, renewProducts } from 'store/actions/shopify';
import { ProductApiData } from 'types/Products';

type ProductActions = ActionTypes<typeof getProducts | typeof changeProductKey | typeof loadMoreProducts | typeof renewProducts>;

type SearchKey = string;

export interface DataState {
  data: ProductApiData[];
  requestStatus: Status;
  renewProductsStatus: Status;
  loadMoreStatus: Status;
  message: string;
  hasNextPage: boolean;
}

export interface ProductState {
  searchKey: string;
  products: Record<SearchKey, undefined | DataState>;
}

const defaultState: ProductState = {
  searchKey: '',
  products: {},
};

export const defaultProductDataState: DataState = {
  data: [],
  requestStatus: 'idle',
  renewProductsStatus: 'idle',
  message: '',
  hasNextPage: false,
  loadMoreStatus: 'idle',
};

export const reducerProducts = createReducer<ProductState, ProductActions>(defaultState, [
  handleAction('@Shopify/changeProductKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
  handleAction('@Shopify/getProducts/request', ({ state }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          requestStatus: (products[searchKey] ?? defaultProductDataState).data.length > 0 ? 'success' : 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/getProducts/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { products, searchKey } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          requestStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/getProducts/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { products, searchKey } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          requestStatus: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreProducts/request', ({ state }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          loadMoreStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreProducts/success', ({ state, action }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          data: (products[searchKey] ?? defaultProductDataState).data.concat(action.payload.data),
          loadMoreStatus: 'success',
          hasNextPage: action.payload.hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreProducts/failure', ({ state }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          loadMoreStatus: 'failure',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreProducts/cancel', ({ state }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          loadMoreStatus: 'idle',
        },
      },
    };
  }),
  handleAction('@Shopify/renewProducts/request', ({ state }) => {
    const { searchKey, products } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...defaultProductDataState,
          requestStatus: 'loading',
          renewProductsStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/renewProducts/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { products, searchKey } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          requestStatus: 'success',
          renewProductsStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/renewProducts/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { products, searchKey } = state;
    return {
      ...state,
      products: {
        ...products,
        [searchKey]: {
          ...(products[searchKey] ?? defaultProductDataState),
          requestStatus: 'failure',
          renewProductsStatus: 'failure',
          message,
        },
      },
    };
  }),
]);
