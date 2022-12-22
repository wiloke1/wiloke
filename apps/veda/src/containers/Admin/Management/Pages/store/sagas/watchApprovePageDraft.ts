import { put, retry, takeEvery } from 'redux-saga/effects';
import { approvePageDraft } from 'services/PageService/Logic/approvePageDraft';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { approvePageDraft as actionApprovePageDraft } from '../actions/actionPagesDraft';

function* handleApprovePageDraft({ payload }: ReturnType<typeof actionApprovePageDraft.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof approvePageDraft>> = yield retry(3, 1000, approvePageDraft, { commandId });
    yield put(actionApprovePageDraft.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionApprovePageDraft.failure({ commandId }));
  }
}

export function* watchApprovePageDraft() {
  yield takeEvery(getActionType(actionApprovePageDraft.request), handleApprovePageDraft);
}
