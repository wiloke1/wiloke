import { call, put, select, takeLatest } from 'redux-saga/effects';
import { presetStyleService } from 'services/PresetStyleService';
import { PresetStyle } from 'types/PresetStyles';
import { getActionType } from 'wiloke-react-core/utils';
import { updateCssVariables } from 'store/global/cssVariables/slice';
import { presetStyleSelector } from 'store/selectors';
import { installPresetStyle, PresetStyleState } from '..';

function* handleGet({ payload }: ReturnType<typeof installPresetStyle.request>) {
  const { id } = payload;

  try {
    const { installStatus, presetStyles }: PresetStyleState = yield select(presetStyleSelector);

    if (installStatus[id] === 'success') {
      const oldData = presetStyles.filter(item => item.id === id)[0];
      yield put(updateCssVariables({ colors: oldData.colors, fonts: oldData.fonts }));
      yield put(installPresetStyle.success({ id }));
    } else {
      const response: PresetStyle = yield call(presetStyleService.getPresetStyle, id);
      yield put(updateCssVariables({ colors: response.colors, fonts: response.fonts }));
      yield put(installPresetStyle.success({ id }));
    }
  } catch (error) {
    yield put(installPresetStyle.failure({ id }));
  }
}

export function* watchInstallPresetStyle() {
  yield takeLatest(getActionType(installPresetStyle.request), handleGet);
}
