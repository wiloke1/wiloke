import { put, retry, takeEvery } from 'redux-saga/effects';
import { i18n } from 'translation';
import { approveThemeDraft } from 'services/ThemeService/Logic/approveThemeDraft';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { approveThemeDraft as actionApproveThemeDraft } from '../actions/actionThemesDraft';

function* handleApproveThemeDraft({ payload }: ReturnType<typeof actionApproveThemeDraft.request>) {
  const { commandId } = payload;
  try {
    yield retry(3, 1000, approveThemeDraft, { commandId });
    yield put(actionApproveThemeDraft.success({ commandId }));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.approve', { text: i18n.t('general.success') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionApproveThemeDraft.failure({ commandId }));
  }
}

export function* watchApproveThemeDraft() {
  yield takeEvery(getActionType(actionApproveThemeDraft.request), handleApproveThemeDraft);
}
