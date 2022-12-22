import { put, retry, select, takeLatest, takeLeading } from '@redux-saga/core/effects';
import { collectionService } from 'services/ShopifyServices/Collection';
import { getCollections, loadMoreCollections } from 'store/actions/shopify';
import { CollectionState, DataState, defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { shopifySelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGet({ payload: { refresh } }: ReturnType<typeof getCollections.request>) {
  try {
    const { searchKey, collections }: CollectionState = yield select(shopifySelector.collections);

    const { data, hasNextPage, requestStatus } = collections[searchKey] || defaultCollectionDataState;
    if (requestStatus === 'success' && !refresh) {
      yield put(getCollections.success({ data, hasNextPage }));
    } else {
      const response: Awaited<ReturnType<typeof collectionService.getCollections>> = yield retry(3, 500, collectionService.getCollections, searchKey);
      yield put(getCollections.success({ data: response.info, hasNextPage: response.hasNextPage }));
    }
  } catch (error) {
    const _err = error as Error;
    yield getCollections.failure({ message: _err.message });
  }
}

export function* watchGetCollections() {
  yield takeLatest(getActionType(getCollections.request), handleGet);
}

function* handleLoadMore() {
  try {
    const { collections, searchKey }: CollectionState = yield select(shopifySelector.collections);
    const { data } = collections[searchKey] as Exclude<DataState, undefined>;
    const cursor = data[data.length - 1].cursor;

    const response: Awaited<ReturnType<typeof collectionService.loadMoreCollections>> = yield retry(
      3,
      500,
      collectionService.loadMoreCollections,
      searchKey,
      cursor,
    );
    yield put(loadMoreCollections.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    const _err = error as Error;
    yield loadMoreCollections.failure({ message: _err.message });
  }
}

export function* watchLoadMoreCollections() {
  yield takeLeading(getActionType(loadMoreCollections.request), handleLoadMore);
}
