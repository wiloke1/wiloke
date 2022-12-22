import { ProductApiData } from 'types/Products';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getProducts = createAsyncAction(['@Shopify/getProducts/request', '@Shopify/getProducts/success', '@Shopify/getProducts/failure'])<
  { search: string; refresh?: boolean },
  { data: ProductApiData[]; hasNextPage: boolean },
  { message: string }
>();

export const loadMoreProducts = createAsyncAction([
  '@Shopify/loadMoreProducts/request',
  '@Shopify/loadMoreProducts/success',
  '@Shopify/loadMoreProducts/failure',
  '@Shopify/loadMoreProducts/cancel',
])<{ search: string }, { data: ProductApiData[]; hasNextPage: boolean }, { message: string }>();

export const changeProductKey = createAction('@Shopify/changeProductKey', (searchKey: string) => ({ searchKey }));

export const renewProducts = createAsyncAction([
  '@Shopify/renewProducts/request',
  '@Shopify/renewProducts/success',
  '@Shopify/renewProducts/failure',
])<{ search: string }, { data: ProductApiData[]; hasNextPage: boolean }, { message: string }>();

export const useChangeProductKey = createDispatchAction(changeProductKey);
export const useGetProducts = createDispatchAsyncAction(getProducts);
export const useLoadMoreProducts = createDispatchAsyncAction(loadMoreProducts);
export const useRenewProducts = createDispatchAsyncAction(renewProducts);
