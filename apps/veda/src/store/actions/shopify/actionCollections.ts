import { CollectionApiData } from 'types/Collections';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getCollections = createAsyncAction([
  '@Shopify/getCollections/request',
  '@Shopify/getCollections/success',
  '@Shopify/getCollections/failure',
])<{ search: string; refresh?: boolean }, { data: CollectionApiData[]; hasNextPage: boolean }, { message: string }>();

export const loadMoreCollections = createAsyncAction([
  '@Shopify/loadMoreCollections/request',
  '@Shopify/loadMoreCollections/success',
  '@Shopify/loadMoreCollections/failure',
  '@Shopify/loadMoreCollections/cancel',
])<{ search: string }, { data: CollectionApiData[]; hasNextPage: boolean }, { message: string }>();

export const changeCollectionKey = createAction('@Shopify/changeCollectionKey', (searchKey: string) => ({ searchKey }));

export const renewCollections = createAsyncAction([
  '@Shopify/renewCollections/request',
  '@Shopify/renewCollections/success',
  '@Shopify/renewCollections/failure',
])<{ search: string }, { data: CollectionApiData[]; hasNextPage: boolean }, { message: string }>();

export const useChangeCollectionKey = createDispatchAction(changeCollectionKey);
export const useGetCollections = createDispatchAsyncAction(getCollections);
export const useLoadMoreCollections = createDispatchAsyncAction(loadMoreCollections);
export const useRenewCollections = createDispatchAsyncAction(renewCollections);
