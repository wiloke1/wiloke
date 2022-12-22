import { put, retry, takeEvery } from 'redux-saga/effects';
import { commitPageDraft } from 'services/PageService/Logic/commitPageDraft';
import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { commitPageDraft as actionCommitPageDraft } from '../actions/actionPagesDraft';
import { setModalCommitDraft } from '../reducers/slicePagesDraft';

function* handleCommitPageDraft({ payload }: ReturnType<typeof actionCommitPageDraft.request>) {
  const { item, message } = payload;
  const { commandId } = item;
  try {
    const { info, message: messageResponse }: Awaited<ReturnType<typeof commitPageDraft>> = yield retry(3, 1000, commitPageDraft, {
      page: item,
      message,
    });

    // TODO: Utils transform thay vì ép kiểu
    yield put(actionCommitPageDraft.success({ commandId, newItem: info as DevPageDatabase }));
    yield put(setModalCommitDraft(undefined));
    notifyAxiosHandler.handleSuccess(messageResponse);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionCommitPageDraft.failure({ commandId }));
  }
}

export function* watchCommitPageDraft() {
  yield takeEvery(getActionType(actionCommitPageDraft.request), handleCommitPageDraft);
}
