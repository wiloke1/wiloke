import { ArticlesApiData } from 'types/Articles';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getArticles = createAsyncAction(['@Shopify/getArticles/request', '@Shopify/getArticles/success', '@Shopify/getArticles/failure'])<
  { search: string; blogId: number },
  { data: ArticlesApiData[]; hasNextPage: boolean },
  { message: string }
>();

export const loadMoreArticles = createAsyncAction([
  '@Shopify/loadMoreArticles/request',
  '@Shopify/loadMoreArticles/success',
  '@Shopify/loadMoreArticles/failure',
])<{ search: string; blogId: number }, { data: ArticlesApiData[]; hasNextPage: boolean }, { message: string }>();

export const changeArticleKey = createAction('@Shopify/changeArticleKey', (searchKey: string) => ({ searchKey }));
export const setBlogIdOfArticle = createAction('@Shopify/setBlogIdOfArticle', (blogId: number) => ({ blogId }));

export const useChangeArticleKey = createDispatchAction(changeArticleKey);
export const useGetArticles = createDispatchAsyncAction(getArticles);
export const useLoadMoreArticles = createDispatchAsyncAction(loadMoreArticles);
export const useSetBlogIdOfArticle = createDispatchAction(setBlogIdOfArticle);
