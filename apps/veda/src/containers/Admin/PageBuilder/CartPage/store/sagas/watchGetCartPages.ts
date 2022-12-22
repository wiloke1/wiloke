import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { getPagesClient } from 'services/PageService/Logic/getPagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCartPages } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionGetCartPages.request>) {
  const { filterType, pageType, s } = payload;
  try {
    const response: Awaited<ReturnType<typeof getPagesClient>> = yield retry(3, 500, getPagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
    });
    yield put(actionGetCartPages.success({ data: response.info as BE_PageClient[] }));
  } catch (error) {
    yield put(actionGetCartPages.failure(undefined));
  }
}

export function* watchGetCartPages() {
  yield takeLatest(getActionType(actionGetCartPages.request), handleGet);
}
