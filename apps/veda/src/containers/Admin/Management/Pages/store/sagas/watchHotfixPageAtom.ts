import { put, retry, takeEvery } from 'redux-saga/effects';
import { hotfixPageAtom } from 'services/PageService/Logic/hotfixPageAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { hotfixPageAtom as actionHotfixPageAtom } from '../actions/actionPagesAtom';
import { setModalHotfixPage } from '../reducers/slicePagesAtom';

function* handleHotfixPageAtom({ payload }: ReturnType<typeof actionHotfixPageAtom.request>) {
  const { commandId, assignToUserId, message } = payload;
  try {
    const response: Awaited<ReturnType<typeof hotfixPageAtom>> = yield retry(3, 1000, hotfixPageAtom, {
      commandId,
      assignTo: assignToUserId,
      comment: message,
    });
    yield put(actionHotfixPageAtom.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setModalHotfixPage(undefined));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionHotfixPageAtom.failure({ commandId }));
  }
}

export function* watchHotfixPageAtom() {
  yield takeEvery(getActionType(actionHotfixPageAtom.request), handleHotfixPageAtom);
}
