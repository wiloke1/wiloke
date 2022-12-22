import { PageApiData } from 'types/Pages';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getPages = createAsyncAction(['@Shopify/getPages/request', '@Shopify/getPages/success', '@Shopify/getPages/failure'])<
  { search: string },
  { data: PageApiData[]; hasNextPage: boolean },
  { message: string }
>();

export const loadMoreShopifyPages = createAsyncAction([
  '@Shopify/loadMorePages/request',
  '@Shopify/loadMorePages/success',
  '@Shopify/loadMorePages/failure',
])<{ search: string }, { data: PageApiData[]; hasNextPage: boolean }, { message: string }>();

export const changePageKey = createAction('@Shopify/changePageKey', (searchKey: string) => ({ searchKey }));

export const useChangePageKey = createDispatchAction(changePageKey);
export const useGetPages = createDispatchAsyncAction(getPages);
export const useLoadMoreShopifyPages = createDispatchAsyncAction(loadMoreShopifyPages);
