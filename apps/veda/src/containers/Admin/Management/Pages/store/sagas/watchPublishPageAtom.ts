import { put, retry, takeLatest } from 'redux-saga/effects';
import { publishPageAtom } from 'services/PageService/Logic/publishPageAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { publishPageAtom as actionPublishPageAtom } from '../actions/actionPagesAtom';
import { setModalPublishPage } from '../reducers/slicePagesAtom';

function* handlePublishPageAtom({ payload }: ReturnType<typeof actionPublishPageAtom.request>) {
  const { pageAtom, categoryOfProduct } = payload;
  try {
    const response: Awaited<ReturnType<typeof publishPageAtom>> = yield retry(3, 1000, publishPageAtom, { pageAtom, categoryOfProduct });
    yield put(actionPublishPageAtom.success(undefined));
    yield put(setModalPublishPage(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionPublishPageAtom.failure(undefined));
  }
}

export function* watchPublishPageAtom() {
  yield takeLatest(getActionType(actionPublishPageAtom.request), handlePublishPageAtom);
}
