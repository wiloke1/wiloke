import { call, put, takeLatest } from '@redux-saga/core/effects';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { loadMorePagesClient } from 'services/PageService/Logic/loadMorePagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreCustomerActivateAccount } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionLoadMoreCustomerActivateAccount.request>) {
  const { filterType, lastCursor, pageType, s } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadMorePagesClient>> = yield call(loadMorePagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
      lastCursor,
    });
    const responseData = response.info as BE_PageClient[];

    yield put(actionLoadMoreCustomerActivateAccount.success({ data: responseData, hasNextPage: responseData.length > 0 ? true : false }));
  } catch (error) {
    yield put(actionLoadMoreCustomerActivateAccount.failure(undefined));
  }
}

export function* watchLoadMoreCustomerActivateAccounts() {
  yield takeLatest(getActionType(actionLoadMoreCustomerActivateAccount.request), handleGet);
}
