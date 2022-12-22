import { AxiosError } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { deleteClientThemeAPI } from 'services/ThemeService/Logic/deleteThemeClient';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteClientTheme } from '../slice/actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteClientTheme.request>) {
  try {
    const response: Awaited<ReturnType<typeof deleteClientThemeAPI>> = yield retry(3, 1000, deleteClientThemeAPI, { commandId });
    yield put(deleteClientTheme.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(deleteClientTheme.failure({ commandId }));
  }
}

export function* watchDeleteClientTheme() {
  yield takeLatest(getActionType(deleteClientTheme.request), handleDelete);
}
