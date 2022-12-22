import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { getPagesClient } from 'services/PageService/Logic/getPagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPasswordPages } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionGetPasswordPages.request>) {
  const { filterType, pageType, s } = payload;
  try {
    const response: Awaited<ReturnType<typeof getPagesClient>> = yield retry(3, 500, getPagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
    });
    yield put(actionGetPasswordPages.success({ data: response.info as BE_PageClient[] }));
  } catch (error) {
    yield put(actionGetPasswordPages.failure(undefined));
  }
}

export function* watchGetPasswordPages() {
  yield takeLatest(getActionType(actionGetPasswordPages.request), handleGet);
}
