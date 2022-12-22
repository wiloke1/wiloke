import { put, retry, takeLatest } from 'redux-saga/effects';
import { getThemesDraft } from 'services/ThemeService/Logic/getThemesDraft';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getThemesDraft as actionGetThemesDraft } from '../actions/actionThemesDraft';

function* handleGetThemesDraft(_: ReturnType<typeof actionGetThemesDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof getThemesDraft>> = yield retry(3, 1000, getThemesDraft);
    yield put(actionGetThemesDraft.success({ data: response, hasNextPage: response.length > 0 }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetThemesDraft.failure(undefined));
  }
}

export function* watchGetThemesDraft() {
  yield takeLatest(getActionType(actionGetThemesDraft.request), handleGetThemesDraft);
}
