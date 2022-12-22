import { delay, put, take } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { setSelectPage } from './slice';

export function* watchSelectPage() {
  while (true) {
    yield take(getActionType(setSelectPage));
    yield delay(100);
    yield put(setSelectPage(false));
  }
}
