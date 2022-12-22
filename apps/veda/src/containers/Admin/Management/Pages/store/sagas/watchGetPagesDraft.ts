import { put, retry, takeLatest } from 'redux-saga/effects';
import { getPagesDraft } from 'services/PageService/Logic/getPagesDraft';
import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getPagesDraft as actionGetPagesDraft } from '../actions/actionPagesDraft';

function* handleGetPagesDraft(_: ReturnType<typeof actionGetPagesDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof getPagesDraft>> = yield retry(3, 1000, getPagesDraft);

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionGetPagesDraft.success({
        data: response.info as DevPageDatabase[],
        hasNextPage: response.info.length > 0,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetPagesDraft.failure(undefined));
  }
}

export function* watchGetPagesDraft() {
  yield takeLatest(getActionType(actionGetPagesDraft.request), handleGetPagesDraft);
}
