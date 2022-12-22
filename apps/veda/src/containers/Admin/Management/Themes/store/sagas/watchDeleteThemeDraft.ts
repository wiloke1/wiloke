import { put, retry, takeEvery } from 'redux-saga/effects';
import { deleteThemeDraft } from 'services/ThemeService/Logic/deleteThemeDraft';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteThemeDraft as actionDeleteThemeDraft } from '../actions/actionThemesDraft';

function* handleDeleteThemeDraft({ payload }: ReturnType<typeof actionDeleteThemeDraft.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof deleteThemeDraft>> = yield retry(3, 1000, deleteThemeDraft, { commandId });
    yield put(actionDeleteThemeDraft.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionDeleteThemeDraft.failure({ commandId }));
  }
}

export function* watchDeleteThemeDraft() {
  yield takeEvery(getActionType(actionDeleteThemeDraft.request), handleDeleteThemeDraft);
}
