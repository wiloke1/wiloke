import { put, retry, select, takeLatest, takeLeading, call } from '@redux-saga/core/effects';
import { shopifyBlogService } from 'services/ShopifyServices/Blog';
import { getBlogs, loadMoreBlogs } from 'store/actions/shopify';
import { DataState, defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { shopifySelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { getArticleByBlogId } from './watchGetArticles';

function* handleGet({ payload: { shouldGetArticle, limit, refresh } }: ReturnType<typeof getBlogs.request>) {
  try {
    const { searchKey, blogs }: ReturnType<typeof shopifySelector.blogs> = yield select(shopifySelector.blogs);
    const { requestStatus, hasNextPage, data } = blogs[searchKey] || defaultBlogDataState;

    if (requestStatus === 'success' && !refresh) {
      yield put(getBlogs.success({ data, hasNextPage }));
    } else {
      const response: Awaited<ReturnType<typeof shopifyBlogService.getBlogs>> = yield retry(3, 500, shopifyBlogService.getBlogs, searchKey, limit);

      if (shouldGetArticle === true) {
        if (response.info.length > 0) {
          for (const blog of response.info) {
            yield call(getArticleByBlogId, blog.id);
          }
        }
      }

      yield put(getBlogs.success({ data: response.info, hasNextPage: response.hasNextPage }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(getBlogs.failure({ message: _err.message }));
  }
}

export function* watchGetBlogs() {
  yield takeLatest(getActionType(getBlogs.request), handleGet);
}

function* handleLoadMore({ payload: { shouldGetArticle } }: ReturnType<typeof loadMoreBlogs.request>) {
  try {
    const { blogs, searchKey }: ReturnType<typeof shopifySelector.blogs> = yield select(shopifySelector.blogs);
    const { data } = blogs[searchKey] as Exclude<DataState, undefined>;
    const cursor = data[data.length - 1].id;

    const response: Awaited<ReturnType<typeof shopifyBlogService.loadMoreBlog>> = yield retry(
      3,
      500,
      shopifyBlogService.loadMoreBlog,
      searchKey,
      cursor,
    );

    if (shouldGetArticle === true) {
      if (response.info.length > 0) {
        for (const blog of response.info) {
          yield call(getArticleByBlogId, blog.id);
        }
      }
    }

    yield put(loadMoreBlogs.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    const _err = error as Error;
    yield put(loadMoreBlogs.failure({ message: _err.message }));
  }
}

export function* watchLoadMoreBlogs() {
  yield takeLeading(getActionType(loadMoreBlogs.request), handleLoadMore);
}
