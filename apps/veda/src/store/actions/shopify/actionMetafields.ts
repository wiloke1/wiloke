import { Metafield, OwnerType } from 'types/Metafields';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getMetafields = createAsyncAction([
  '@Shopify/getMetafields/request',
  '@Shopify/getMetafields/success',
  '@Shopify/getMetafields/failure',
])<{ ownerType: OwnerType }, { ownerType: OwnerType; data: Metafield[]; hasNextPage: boolean }, { ownerType: OwnerType }>();

export const loadmoreMetafields = createAsyncAction([
  '@Shopify/loadmoreMetafields/request',
  '@Shopify/loadmoreMetafields/success',
  '@Shopify/loadmoreMetafields/failure',
])<{ ownerType: OwnerType }, { ownerType: OwnerType; data: Metafield[]; hasNextPage: boolean }, { ownerType: OwnerType }>();

export const useGetMetafields = createDispatchAsyncAction(getMetafields);
export const useLoadmoreMetafields = createDispatchAsyncAction(loadmoreMetafields);
