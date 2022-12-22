import { put, select, takeLatest } from '@redux-saga/core/effects';
import { changeModalAdminSettings } from 'containers/Admin/Modals';
import { templatePopupSelector } from 'containers/Admin/selector';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { Consts } from 'utils/constants/constants';
import { getActionType } from 'wiloke-react-core/utils';
import { actionCreateBlankPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionCreateBlankPage.request>) {
  const { templateId, name, includeHeaderFooter, callback } = payload;
  try {
    const { isCreate }: ReturnType<typeof templatePopupSelector> = yield select(templatePopupSelector);

    if (isCreate) {
      yield put(actionCreateBlankPage.success(undefined));
      yield put(setGeneralSettingsPage({ pageId: Consts.BlankCommandId, settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createNormalPage: false }));
      callback?.(Consts.BlankCommandId);
    } else {
      yield put(actionCreateBlankPage.success(undefined));
      yield put(setGeneralSettingsPage({ settings: { label: name, headerFooterEnabled: includeHeaderFooter } }));
      yield put(changeModalAdminSettings({ createNormalPage: false }));
      callback?.(templateId);
    }
  } catch (error) {
    yield put(actionCreateBlankPage.failure(undefined));
  }
}

export function* watchCreateBlankPage() {
  yield takeLatest(getActionType(actionCreateBlankPage.request), handleCreate);
}
