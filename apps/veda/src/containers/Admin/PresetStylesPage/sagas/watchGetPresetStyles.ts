import { call, put, takeLatest } from 'redux-saga/effects';
import { presetStyleService } from 'services/PresetStyleService';
import { PresetStyle } from 'types/PresetStyles';
import { getActionType } from 'wiloke-react-core/utils';
import { getPresetStyles } from '..';

function* handleGet() {
  const response: PresetStyle[] = yield call(presetStyleService.getPresetStyles);
  yield put(getPresetStyles.success({ data: response }));
  try {
  } catch (error) {
    yield put(getPresetStyles.failure(undefined));
  }
}

export function* watchGetPresetStyles() {
  yield takeLatest(getActionType(getPresetStyles.request), handleGet);
}
