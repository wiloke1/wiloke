import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getPages, changePageKey, loadMoreShopifyPages } from 'store/actions/shopify';
import { PageApiData } from 'types/Pages';

type PageActions = ActionTypes<typeof getPages | typeof changePageKey | typeof loadMoreShopifyPages>;

export interface DataState {
  data: PageApiData[];
  hasNextPage: boolean;
  requestStatus: Status;
  loadMoreStatus: Status;
  message: string;
}

export interface PageState {
  searchKey: string;
  pages: Record<string, undefined | DataState>;
}

const defaultState: PageState = {
  searchKey: '',
  pages: {},
};

export const defaultPageDataState: DataState = {
  data: [],
  hasNextPage: false,
  requestStatus: 'idle',
  loadMoreStatus: 'idle',
  message: '',
};

export const reducerPages = createReducer<PageState, PageActions>(defaultState, [
  handleAction('@Shopify/changePageKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
  handleAction('@Shopify/getPages/request', ({ state }) => {
    const { searchKey, pages } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          requestStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/getPages/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { pages, searchKey } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          requestStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/getPages/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { pages, searchKey } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          requestStatus: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMorePages/request', ({ state }) => {
    const { searchKey, pages } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          loadMoreStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMorePages/success', ({ state, action }) => {
    const { searchKey, pages } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          loadMoreStatus: 'success',
          data: (pages[searchKey] ?? defaultPageDataState).data.concat(action.payload.data),
          hasNextPage: action.payload.hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMorePages/failure', ({ state }) => {
    const { searchKey, pages } = state;
    return {
      ...state,
      pages: {
        ...pages,
        [searchKey]: {
          ...(pages[searchKey] ?? defaultPageDataState),
          loadMoreStatus: 'failure',
        },
      },
    };
  }),
]);
