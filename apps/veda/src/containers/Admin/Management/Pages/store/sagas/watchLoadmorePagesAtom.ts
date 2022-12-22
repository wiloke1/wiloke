import { put, retry, takeLatest } from 'redux-saga/effects';
import { loadmorePagesAtom } from 'services/PageService/Logic/loadmorePagesAtom';
import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMorePagesAtom as actionLoadMorePagesAtom } from '../actions/actionPagesAtom';

function* handleLoadMorePagesAtom({ payload }: ReturnType<typeof actionLoadMorePagesAtom.request>) {
  const { cursor } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadmorePagesAtom>> = yield retry(3, 1000, loadmorePagesAtom, { cursor });

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionLoadMorePagesAtom.success({
        data: response.info as AdminPageDatabase[],
        hasNextPage: response.info.length > 0,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadMorePagesAtom.failure(undefined));
  }
}

export function* watchLoadMorePagesAtom() {
  yield takeLatest(getActionType(actionLoadMorePagesAtom.request), handleLoadMorePagesAtom);
}
