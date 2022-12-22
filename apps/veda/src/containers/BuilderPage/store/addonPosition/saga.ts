import { put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { toggleFullScreen } from '../fullScreen/slice';
import { setResponsive } from '../responsive/slice';
import { setAddonsPositionStart } from './slice';

function* handleAddonPositionStart({ payload }: ReturnType<typeof setAddonsPositionStart>) {
  if (payload.value) {
    yield put(setResponsive('desktop'));
  }
  yield put(toggleFullScreen(undefined));
}

export function* watchAddonPositionStart() {
  yield takeLatest(getActionType(setAddonsPositionStart), handleAddonPositionStart);
}
