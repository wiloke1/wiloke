import { put, retry, takeLatest } from 'redux-saga/effects';
import { deleteThemeProductService } from 'services/ThemeService/Logic/deleteThemeProduct';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteProductTheme } from '../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteProductTheme.request>) {
  try {
    const response: Awaited<ReturnType<typeof deleteThemeProductService>> = yield retry(3, 1000, deleteThemeProductService, { commandId });
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(deleteProductTheme.success({ commandId }));
  } catch (error) {
    yield put(deleteProductTheme.failure({ commandId }));
  }
}

export function* watchDeleteProductTheme() {
  yield takeLatest(getActionType(deleteProductTheme.request), handleDelete);
}
