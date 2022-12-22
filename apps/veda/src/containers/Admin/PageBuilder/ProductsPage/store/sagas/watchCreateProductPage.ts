import { put, select, takeLatest } from '@redux-saga/core/effects';
import { changeModalAdminSettings, ModalAdminState } from 'containers/Admin/Modals';
import { modalsSelector } from 'containers/Admin/selector';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { Consts } from 'utils/constants/constants';
import { getActionType } from 'wiloke-react-core/utils';
import { actionCreateProductPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionCreateProductPage.request>) {
  const { templateId, name, includeHeaderFooter, callback } = payload;
  try {
    const { isCreate }: ModalAdminState = yield select(modalsSelector);

    if (isCreate) {
      yield put(actionCreateProductPage.success(undefined));
      yield put(setGeneralSettingsPage({ pageId: Consts.BlankCommandId, settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createProduct: false }));
      callback?.(Consts.BlankCommandId);
    } else {
      yield put(actionCreateProductPage.success(undefined));
      yield put(setGeneralSettingsPage({ settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createProduct: false }));
      callback?.(templateId);
    }
  } catch (error) {
    yield put(actionCreateProductPage.failure(undefined));
  }
}

export function* watchCreateProductPage() {
  yield takeLatest(getActionType(actionCreateProductPage.request), handleCreate);
}
