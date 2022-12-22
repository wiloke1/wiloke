import { BlogApiData } from 'types/Blogs';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getBlogs = createAsyncAction(['@Shopify/getBlogs/request', '@Shopify/getBlogs/success', '@Shopify/getBlogs/failure'])<
  { search: string; shouldGetArticle: boolean; limit?: number; refresh?: boolean },
  { data: BlogApiData[]; hasNextPage: boolean },
  { message: string }
>();

export const loadMoreBlogs = createAsyncAction([
  '@Shopify/loadMoreBlogs/request',
  '@Shopify/loadMoreBlogs/success',
  '@Shopify/loadMoreBlogs/failure',
])<{ search: string; shouldGetArticle: boolean }, { data: BlogApiData[]; hasNextPage: boolean }, { message: string }>();

export const changeBlogKey = createAction('@Shopify/changeBlogKey', (searchKey: string) => ({ searchKey }));

export const useChangeBlogKey = createDispatchAction(changeBlogKey);
export const useGetBlogs = createDispatchAsyncAction(getBlogs);
export const useLoadMoreBlogs = createDispatchAsyncAction(loadMoreBlogs);
