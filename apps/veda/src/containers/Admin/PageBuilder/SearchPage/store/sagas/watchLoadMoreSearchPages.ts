import { call, put, takeLatest } from '@redux-saga/core/effects';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { loadMorePagesClient } from 'services/PageService/Logic/loadMorePagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreSearchPage } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionLoadMoreSearchPage.request>) {
  const { filterType, lastCursor, pageType, s } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadMorePagesClient>> = yield call(loadMorePagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
      lastCursor,
    });
    const responseData = response.info as BE_PageClient[];

    yield put(actionLoadMoreSearchPage.success({ data: responseData, hasNextPage: responseData.length > 0 ? true : false }));
  } catch (error) {
    yield put(actionLoadMoreSearchPage.failure(undefined));
  }
}

export function* watchLoadMoreSearchPages() {
  yield takeLatest(getActionType(actionLoadMoreSearchPage.request), handleGet);
}
