import { call, put, retry, select, takeLatest, takeLeading } from '@redux-saga/core/effects';
import { shopifyPageService } from 'services/ShopifyServices/Page';
import { getPages, loadMoreShopifyPages } from 'store/actions/shopify';
import { DataState } from 'store/reducers/shopify/reducerPages';
import { shopifySelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGet() {
  try {
    const { searchKey }: ReturnType<typeof shopifySelector.pages> = yield select(shopifySelector.pages);
    const response: Awaited<ReturnType<typeof shopifyPageService.getPages>> = yield retry(3, 500, shopifyPageService.getPages, searchKey);
    yield put(getPages.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    const _err = error as Error;
    yield put(getPages.failure({ message: _err.message }));
  }
}

function* handleLoadMore({ payload }: ReturnType<typeof loadMoreShopifyPages.request>) {
  const { search } = payload;
  try {
    const { pages, searchKey }: ReturnType<typeof shopifySelector.pages> = yield select(shopifySelector.pages);
    const { data } = pages[searchKey] as Exclude<DataState, undefined>;

    const lastCursor = data[data.length - 1].id;
    const response: Awaited<ReturnType<typeof shopifyPageService.loadMorePages>> = yield call(shopifyPageService.loadMorePages, lastCursor, search);
    yield put(loadMoreShopifyPages.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    const _err = error as Error;
    yield put(loadMoreShopifyPages.failure({ message: _err.message }));
  }
}

export function* watchGetPages() {
  yield takeLatest(getActionType(getPages.request), handleGet);
}

export function* watchLoadMoreShopifyPages() {
  yield takeLeading(getActionType(loadMoreShopifyPages.request), handleLoadMore);
}
