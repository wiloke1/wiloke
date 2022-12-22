import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getPageCounterService } from 'services/PageService/Logic/getPageCounter';
import { getActionType } from 'wiloke-react-core/utils';
import { getPageCounter } from '../slicePageCounter';

export function* handleGetPageCounter(_: ReturnType<typeof getPageCounter.request>) {
  try {
    const response: SagaReturnType<typeof getPageCounterService> = yield retry(3, 1000, getPageCounterService);
    yield put(getPageCounter.success(response.info));
  } catch (error) {
    yield put(getPageCounter.failure(undefined));
  }
}

export function* watchGetPageCounter() {
  yield takeLatest(getActionType(getPageCounter.request), handleGetPageCounter);
}
