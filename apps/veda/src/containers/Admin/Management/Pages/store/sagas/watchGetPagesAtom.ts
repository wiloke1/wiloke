import { put, retry, takeLatest } from 'redux-saga/effects';
import { getPagesAtom } from 'services/PageService/Logic/getPagesAtom';
import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getPagesAtom as actionGetPagesAtom } from '../actions/actionPagesAtom';

function* handleGetPagesAtom(_: ReturnType<typeof actionGetPagesAtom.request>) {
  try {
    const response: Awaited<ReturnType<typeof getPagesAtom>> = yield retry(3, 1000, getPagesAtom);

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionGetPagesAtom.success({
        data: response.info as AdminPageDatabase[],
        hasNextPage: response.info.length > 0,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetPagesAtom.failure(undefined));
  }
}

export function* watchGetPagesAtom() {
  yield takeLatest(getActionType(actionGetPagesAtom.request), handleGetPagesAtom);
}
