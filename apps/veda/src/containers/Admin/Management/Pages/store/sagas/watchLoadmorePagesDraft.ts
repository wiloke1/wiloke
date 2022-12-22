import { put, retry, takeLatest } from 'redux-saga/effects';
import { loadmorePagesDraft } from 'services/PageService/Logic/loadmorePagesDraft';
import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMorePagesDraft as actionLoadMorePagesDraft } from '../actions/actionPagesDraft';

function* handleLoadMorePagesDraft({ payload }: ReturnType<typeof actionLoadMorePagesDraft.request>) {
  const { cursor } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadmorePagesDraft>> = yield retry(3, 1000, loadmorePagesDraft, { cursor });

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionLoadMorePagesDraft.success({
        data: response.info as DevPageDatabase[],
        hasNextPage: response.info.length > 0,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadMorePagesDraft.failure(undefined));
  }
}

export function* watchLoadMorePagesDraft() {
  yield takeLatest(getActionType(actionLoadMorePagesDraft.request), handleLoadMorePagesDraft);
}
