import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { ShopifyProductItem } from '../types/Shopify';

export const getShopifyProducts = createAsyncAction(['@getShopifyProducts/request', '@getShopifyProducts/success', '@getShopifyProducts/failure'])<
  { searchKey: string },
  { data: ShopifyProductItem[]; searchKey: string; hasNextPage: boolean; lastCursor: string },
  { message: string; searchKey: string }
>();
export const actionLoadMoreShopifyProducts = createAsyncAction([
  '@loadMoreShopifyProducts/request',
  '@loadMoreShopifyProducts/success',
  '@loadMoreShopifyProducts/failure',
])<
  { searchKey: string },
  { data: ShopifyProductItem[]; searchKey: string; hasNextPage: boolean; lastCursor: string },
  { message: string; searchKey: string }
>();

export const changeSearchKey = createAction('@Shopify/changeSearchKey', (payload: { searchKey: string }) => ({ ...payload }));

export const useGetShopifyProducts = createDispatchAsyncAction(getShopifyProducts);
export const useLoadMoreShopifyProducts = createDispatchAsyncAction(actionLoadMoreShopifyProducts);
export const useChangeSearchKey = createDispatchAction(changeSearchKey);
