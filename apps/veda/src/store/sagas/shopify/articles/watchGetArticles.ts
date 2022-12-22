import { put, retry, select, takeLeading } from 'redux-saga/effects';
import { shopifyArticleService } from 'services/ShopifyServices/Article';
import { getArticles, loadMoreArticles, setBlogIdOfArticle } from 'store/actions/shopify';
import { ArticleDataState, defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { shopifySelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

export function* getArticleByBlogId(blogId: number) {
  yield put(setBlogIdOfArticle(blogId));
  try {
    const { searchKey, blogId, data }: ReturnType<typeof shopifySelector.articles> = yield select(shopifySelector.articles);
    const { articles, hasNextPage, requestStatus } = data[blogId] || defaultArticleDataState;

    if (requestStatus === 'success') {
      yield put(getArticles.success({ data: articles, hasNextPage: hasNextPage }));
    } else {
      const response: Awaited<ReturnType<typeof shopifyArticleService.getArticles>> = yield retry(3, 500, shopifyArticleService.getArticles, {
        blogId,
        search: searchKey,
      });
      yield put(getArticles.success({ data: response.info, hasNextPage: response.hasNextPage }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(getArticles.failure({ message: _err.message }));
  }
}

function* loadMoreArticleByBlogId() {
  try {
    const { searchKey, data, blogId }: ReturnType<typeof shopifySelector.articles> = yield select(shopifySelector.articles);
    const { articles } = data[blogId] as Exclude<ArticleDataState, undefined>;
    const lastCursor = articles[articles.length - 1].id;

    const response: Awaited<ReturnType<typeof shopifyArticleService.loadMoreArticles>> = yield retry(3, 500, shopifyArticleService.loadMoreArticles, {
      blogId,
      lastCursor,
      search: searchKey,
    });
    yield put(loadMoreArticles.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    console.log('watchLoadMoreArticles', error);
    yield put(loadMoreArticles.failure({ message: 'failed' }));
  }
}

// export function* watchGetArticles() {
//   yield takeLatest(getActionType(getArticles.request), getArticleByBlogId);
// }

export function* watchLoadMoreArticles() {
  yield takeLeading(getActionType(loadMoreArticles.request), loadMoreArticleByBlogId);
}
