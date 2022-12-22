import { put, retry, takeEvery } from 'redux-saga/effects';
import { rejectThemeDraft } from 'services/ThemeService/Logic/rejectThemeDraft';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectThemeDraft as actionRejectThemeDraft } from '../actions/actionThemesDraft';
import { setModalRejectDraft } from '../reducers/sliceThemesDraft';

function* handleRejectThemeDraft({ payload }: ReturnType<typeof actionRejectThemeDraft.request>) {
  const { item, message } = payload;
  const { commandId } = item;
  try {
    const response: Awaited<ReturnType<typeof rejectThemeDraft>> = yield retry(3, 1000, rejectThemeDraft, {
      theme: item,
      message,
    });

    yield put(actionRejectThemeDraft.success({ commandId, newItem: response }));
    yield put(setModalRejectDraft(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.reject', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionRejectThemeDraft.failure({ commandId }));
  }
}

export function* watchRejectThemeDraft() {
  yield takeEvery(getActionType(actionRejectThemeDraft.request), handleRejectThemeDraft);
}
