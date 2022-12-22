import { put, retry, takeEvery } from 'redux-saga/effects';
import { deleteThemeAtom } from 'services/ThemeService/Logic/deleteThemeAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteThemeAtom as actionDeleteThemeAtom } from '../actions/actionThemesAtom';

function* handleDeleteThemeAtom({ payload }: ReturnType<typeof actionDeleteThemeAtom.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof deleteThemeAtom>> = yield retry(3, 1000, deleteThemeAtom, { commandId });
    yield put(actionDeleteThemeAtom.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionDeleteThemeAtom.failure({ commandId }));
  }
}

export function* watchDeleteThemeAtom() {
  yield takeEvery(getActionType(actionDeleteThemeAtom.request), handleDeleteThemeAtom);
}
