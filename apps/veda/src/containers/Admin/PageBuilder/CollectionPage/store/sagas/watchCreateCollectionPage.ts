import { put, select, takeLatest } from '@redux-saga/core/effects';
import { changeModalAdminSettings, ModalAdminState } from 'containers/Admin/Modals';
import { modalsSelector } from 'containers/Admin/selector';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { Consts } from 'utils/constants/constants';
import { getActionType } from 'wiloke-react-core/utils';
import { actionCreateCollectionPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionCreateCollectionPage.request>) {
  const { templateId, name, includeHeaderFooter, callback } = payload;
  try {
    const { isCreate }: ModalAdminState = yield select(modalsSelector);

    if (isCreate) {
      yield put(actionCreateCollectionPage.success(undefined));
      yield put(setGeneralSettingsPage({ pageId: Consts.BlankCommandId, settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createCollection: false }));
      callback?.(Consts.BlankCommandId);
    } else {
      yield put(actionCreateCollectionPage.success(undefined));
      yield put(setGeneralSettingsPage({ settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createCollection: false }));
      callback?.(templateId);
    }
  } catch (error) {
    console.log('error', error);

    yield put(actionCreateCollectionPage.failure(undefined));
  }
}

export function* watchCreateCollectionPage() {
  yield takeLatest(getActionType(actionCreateCollectionPage.request), handleCreate);
}
