import { put, select, takeLatest } from '@redux-saga/core/effects';
import { changeModalAdminSettings, ModalAdminState } from 'containers/Admin/Modals';
import { modalsSelector } from 'containers/Admin/selector';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { Consts } from 'utils/constants/constants';
import { getActionType } from 'wiloke-react-core/utils';
import { actionCreatePasswordPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionCreatePasswordPage.request>) {
  const { templateId, name, includeHeaderFooter, callback } = payload;
  try {
    const { isCreate }: ModalAdminState = yield select(modalsSelector);

    if (isCreate) {
      yield put(actionCreatePasswordPage.success(undefined));
      yield put(setGeneralSettingsPage({ pageId: Consts.BlankCommandId, settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createNormalPage: false }));
      callback?.(Consts.BlankCommandId);
    } else {
      yield put(actionCreatePasswordPage.success(undefined));
      yield put(setGeneralSettingsPage({ settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createNormalPage: false }));
      callback?.(templateId);
    }
  } catch (error) {
    yield put(actionCreatePasswordPage.failure(undefined));
  }
}

export function* watchCreatePasswordPage() {
  yield takeLatest(getActionType(actionCreatePasswordPage.request), handleCreate);
}
