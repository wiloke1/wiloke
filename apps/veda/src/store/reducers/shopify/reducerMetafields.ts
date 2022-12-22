import { getMetafields, loadmoreMetafields } from 'store/actions/shopify/actionMetafields';
import { Metafield, OwnerType } from 'types/Metafields';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

interface StateItem {
  data: Metafield[];
  statusRequest: Status;
  statusLoadmore: Status;
  hasNextPage: boolean;
}

type State = Record<OwnerType, StateItem>;

type Actions = ActionTypes<typeof getMetafields | typeof loadmoreMetafields>;

const defaultState: State = {
  ARTICLE: {
    data: [],
    statusLoadmore: 'idle',
    statusRequest: 'idle',
    hasNextPage: false,
  },
  BLOG: {
    data: [],
    statusLoadmore: 'idle',
    statusRequest: 'idle',
    hasNextPage: false,
  },
  COLLECTION: {
    data: [],
    statusLoadmore: 'idle',
    statusRequest: 'idle',
    hasNextPage: false,
  },
  PRODUCT: {
    data: [],
    statusLoadmore: 'idle',
    statusRequest: 'idle',
    hasNextPage: false,
  },
};

export const reducerMetafields = createReducer<State, Actions>(defaultState, [
  handleAction('@Shopify/getMetafields/request', ({ state, action }) => {
    const { ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        hasNextPage: false,
        statusRequest: state[ownerType].statusRequest === 'success' ? 'success' : 'loading',
      },
    };
  }),
  handleAction('@Shopify/getMetafields/success', ({ state, action }) => {
    const { data, hasNextPage, ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        hasNextPage,
        statusRequest: 'success',
        data,
      },
    };
  }),
  handleAction('@Shopify/getMetafields/failure', ({ state, action }) => {
    const { ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        statusRequest: 'failure',
      },
    };
  }),
  handleAction('@Shopify/loadmoreMetafields/request', ({ state, action }) => {
    const { ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        statusLoadmore: 'loading',
      },
    };
  }),
  handleAction('@Shopify/loadmoreMetafields/success', ({ state, action }) => {
    const { data, hasNextPage, ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        hasNextPage,
        statusLoadmore: 'success',
        data: state[ownerType].data.concat(data),
      },
    };
  }),
  handleAction('@Shopify/loadmoreMetafields/failure', ({ state, action }) => {
    const { ownerType } = action.payload;
    return {
      ...state,
      [ownerType]: {
        ...state[ownerType],
        statusLoadmore: 'failure',
      },
    };
  }),
]);
