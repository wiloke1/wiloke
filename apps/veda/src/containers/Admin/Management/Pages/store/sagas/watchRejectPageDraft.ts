import { put, retry, takeEvery } from 'redux-saga/effects';
import { rejectPageDraft } from 'services/PageService/Logic/rejectPageDraft';
import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectPageDraft as actionRejectPageDraft } from '../actions/actionPagesDraft';
import { setModalRejectDraft } from '../reducers/slicePagesDraft';

function* handleRejectPageDraft({ payload }: ReturnType<typeof actionRejectPageDraft.request>) {
  const { item, message } = payload;
  const { commandId } = item;
  try {
    const { info, message: messageResponse }: Awaited<ReturnType<typeof rejectPageDraft>> = yield retry(3, 1000, rejectPageDraft, {
      page: item,
      message,
    });

    // TODO: Utils transform thay vì ép kiểu
    yield put(actionRejectPageDraft.success({ commandId, newItem: info as DevPageDatabase }));
    yield put(setModalRejectDraft(undefined));
    notifyAxiosHandler.handleSuccess(messageResponse);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionRejectPageDraft.failure({ commandId }));
  }
}

export function* watchRejectPageDraft() {
  yield takeEvery(getActionType(actionRejectPageDraft.request), handleRejectPageDraft);
}
