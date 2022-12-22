import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getCollections, changeCollectionKey, loadMoreCollections, renewCollections } from 'store/actions/shopify';
import { CollectionApiData } from 'types/Collections';
import { ProductApiData } from 'types/Products';

type CollectionActions = ActionTypes<typeof getCollections | typeof changeCollectionKey | typeof loadMoreCollections | typeof renewCollections>;

export interface DataState {
  data: CollectionApiData[];
  requestStatus: Status;
  renewCollectionsStatus: Status;
  loadMoreStatus: Status;
  message: string;
  hasNextPage: boolean;
}

export interface ProductOfCollectionData {
  data: ProductApiData[];
  requestStatus: Status;
  renewCollectionsStatus: Status;
}

export interface CollectionState {
  searchKey: string;
  collections: Record<string, undefined | DataState>;
  products: Record<string, undefined | ProductOfCollectionData>;
  collectionId: string;
  collectionTitle: string;
}

const defaultState: CollectionState = {
  searchKey: '',
  collections: {},
  collectionId: '',
  collectionTitle: '',
  products: {},
};

export const defaultCollectionDataState: DataState = {
  data: [],
  requestStatus: 'idle',
  renewCollectionsStatus: 'idle',
  loadMoreStatus: 'idle',

  message: '',
  hasNextPage: false,
};

export const defaultProductsByCollectionId: ProductOfCollectionData = {
  data: [],
  requestStatus: 'idle',
  renewCollectionsStatus: 'idle',
};

export const reducerCollection = createReducer<CollectionState, CollectionActions>(defaultState, [
  handleAction('@Shopify/changeCollectionKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
  handleAction('@Shopify/getCollections/request', ({ state, action }) => {
    const { searchKey, collections } = state;
    const { refresh } = action.payload;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          requestStatus: (collections[searchKey] ?? defaultCollectionDataState).data.length > 0 && !refresh ? 'success' : 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/getCollections/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { collections, searchKey } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          requestStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/getCollections/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { collections, searchKey } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          requestStatus: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreCollections/request', ({ state }) => {
    const { searchKey, collections } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          loadMoreStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreCollections/success', ({ state, action }) => {
    const { searchKey, collections } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          loadMoreStatus: 'success',
          data: (collections[searchKey] ?? defaultCollectionDataState).data.concat(action.payload.data),
          hasNextPage: action.payload.hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreCollections/failure', ({ state }) => {
    const { searchKey, collections } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          loadMoreStatus: 'failure',
        },
      },
    };
  }),
  handleAction('@Shopify/renewCollections/request', ({ state }) => {
    const { searchKey, collections } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...defaultCollectionDataState,
          requestStatus: 'loading',
          renewCollectionsStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/renewCollections/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { collections, searchKey } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          requestStatus: 'success',
          renewCollectionsStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/renewCollections/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { collections, searchKey } = state;
    return {
      ...state,
      collections: {
        ...collections,
        [searchKey]: {
          ...(collections[searchKey] ?? defaultCollectionDataState),
          requestStatus: 'failure',
          renewCollectionsStatus: 'failure',
          message,
        },
      },
    };
  }),
]);
