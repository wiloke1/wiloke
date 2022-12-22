import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { setAddonToPages } from 'store/actions/actionPages';
import { setSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { setThemeAddon } from 'store/global/themeAddons';
import { getActionType } from 'wiloke-react-core/utils';
import { installAdminAddon, setTemplateBoardVisible } from '../../actions';

function* handleInstall({ payload: { commandId } }: ReturnType<typeof installAdminAddon.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.installAtomAddon>> = yield retry(
      3,
      1000,
      addonService.addons.installAtomAddon,
      commandId,
    );

    yield put(setThemeAddon({ addon: response }));
    yield put(setAddonToPages(response.body));
    yield put(setSidebarTabActive('add-ons'));
    yield put(setTemplateBoardVisible({ visible: false, navKeys: ['admin', 'Addons'] }));

    yield put(installAdminAddon.success({ commandId }));
  } catch (error) {
    yield put(installAdminAddon.failure({ commandId }));
  }
}

export function* watchInstallAdminAddon() {
  yield takeLatest(getActionType(installAdminAddon.request), handleInstall);
}
