import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { getClientThemesAPI } from 'services/ThemeService/Logic/getClientThemes';
import { getActionType } from 'wiloke-react-core/utils';
import { getClientThemes } from '../slice/actions';
import { themeDashboardSelector } from '../slice/sliceThemeDashboard';

function* handleGet() {
  try {
    const { getClientThemesStatus, themes, hasNextPage }: ReturnType<typeof themeDashboardSelector> = yield select(themeDashboardSelector);
    if (getClientThemesStatus === 'success') {
      yield put(getClientThemes.success({ data: themes, hasNextPage }));
    }
    const response: Awaited<ReturnType<typeof getClientThemesAPI>> = yield retry(3, 1000, getClientThemesAPI);
    yield put(getClientThemes.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    console.log('error', error);
    yield put(getClientThemes.failure(undefined));
  }
}

export function* watchGetClientThemes() {
  yield takeLatest(getActionType(getClientThemes.request), handleGet);
}
