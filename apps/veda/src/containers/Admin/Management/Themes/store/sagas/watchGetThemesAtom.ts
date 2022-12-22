import { put, retry, takeLatest } from 'redux-saga/effects';
import { getThemesAtom } from 'services/ThemeService/Logic/getThemesAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getThemesAtom as actionGetThemesAtom } from '../actions/actionThemesAtom';

function* handleGetThemesAtom(_: ReturnType<typeof actionGetThemesAtom.request>) {
  try {
    const response: Awaited<ReturnType<typeof getThemesAtom>> = yield retry(3, 1000, getThemesAtom);
    yield put(actionGetThemesAtom.success({ data: response, hasNextPage: response.length > 0 }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetThemesAtom.failure(undefined));
  }
}

export function* watchGetThemesAtom() {
  yield takeLatest(getActionType(actionGetThemesAtom.request), handleGetThemesAtom);
}
