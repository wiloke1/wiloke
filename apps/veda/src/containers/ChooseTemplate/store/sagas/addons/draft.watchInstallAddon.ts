import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { setAddonToPages } from 'store/actions/actionPages';
import { setSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { setThemeAddon } from 'store/global/themeAddons';
import { getActionType } from 'wiloke-react-core/utils';
import { addDraftAddon, setTemplateBoardVisible } from '../../actions';

function* handleAddAddon({ payload: { commandId } }: ReturnType<typeof addDraftAddon.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.installDraftAddon>> = yield retry(
      3,
      1000,
      addonService.addons.installDraftAddon,
      commandId,
    );

    yield put(setThemeAddon({ addon: response }));
    yield put(setAddonToPages(response.body));
    yield put(setSidebarTabActive('add-ons'));
    yield put(setTemplateBoardVisible({ visible: false, navKeys: ['draft', 'Addons'] }));

    yield put(addDraftAddon.success({ commandId }));
  } catch (error) {
    yield put(addDraftAddon.failure({ commandId }));
  }
}

export function* watchInstallDraftAddon() {
  yield takeLatest(getActionType(addDraftAddon.request), handleAddAddon);
}
