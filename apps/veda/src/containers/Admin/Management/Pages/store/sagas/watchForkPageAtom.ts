import { put, retry, takeEvery } from 'redux-saga/effects';
import { forkPageAtom } from 'services/PageService/Logic/forkPageAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { forkPageAtom as actionForkPageAtom } from '../actions/actionPagesDraft';

function* handleForkPageAtom({ payload }: ReturnType<typeof actionForkPageAtom.request>) {
  const { commandId, callback } = payload;
  try {
    const response: Awaited<ReturnType<typeof forkPageAtom>> = yield retry(3, 1000, forkPageAtom, { commandId });
    yield put(actionForkPageAtom.success({ commandId }));
    callback(response.info.commandId);
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionForkPageAtom.failure(payload));
  }
}

export function* watchForkPageAtom() {
  yield takeEvery(getActionType(actionForkPageAtom.request), handleForkPageAtom);
}
