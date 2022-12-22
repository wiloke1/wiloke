import { put, retry, takeEvery } from 'redux-saga/effects';
import { commitThemeDraft } from 'services/ThemeService/Logic/commitThemeDraft';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { commitThemeDraft as actionCommitThemeDraft } from '../actions/actionThemesDraft';
import { setModalCommitDraft } from '../reducers/sliceThemesDraft';

function* handleCommitThemeDraft({ payload }: ReturnType<typeof actionCommitThemeDraft.request>) {
  const { item, message } = payload;
  const { commandId } = item;
  try {
    const response: Awaited<ReturnType<typeof commitThemeDraft>> = yield retry(3, 1000, commitThemeDraft, {
      theme: item,
      message,
    });

    yield put(actionCommitThemeDraft.success({ commandId, newItem: response }));
    yield put(setModalCommitDraft(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.commit', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionCommitThemeDraft.failure({ commandId }));
  }
}

export function* watchCommitThemeDraft() {
  yield takeEvery(getActionType(actionCommitThemeDraft.request), handleCommitThemeDraft);
}
