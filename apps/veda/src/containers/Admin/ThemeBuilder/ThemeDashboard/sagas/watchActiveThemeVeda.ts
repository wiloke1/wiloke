import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { activeThemeClientService } from 'services/ThemeService/Logic/activeThemeClient';
import { setLayoutSettings } from 'store/actions/actionLayoutSettings';
import { updateCssVariables } from 'store/global/cssVariables/slice';
import { setGlobalThemeJs } from 'store/global/globalThemeJs/slice';
import { setGlobalThemeScss } from 'store/global/globalThemeScss/slice';
import { setFileLanguageActive, setGlobalThemeTranslation } from 'store/global/globalTranslation/slice';
import { setThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { setThemeVendors } from 'store/global/themeVendors/slice';
import { i18n } from 'translation';
import { Vendor } from 'types/Result';

import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { activeThemeVeda } from '../slice/actions';
import { setThemeActive } from '../slice/sliceThemeDashboard';

function* handleActive({ payload: { themeId } }: ReturnType<typeof activeThemeVeda.request>) {
  try {
    const response: SagaReturnType<typeof activeThemeClientService> = yield retry(3, 1000, activeThemeClientService, { commandId: themeId });
    yield put(activeThemeVeda.success({ themeId: response.commandId }));
    yield put(setThemeActive({ ...response }));

    const {
      themeSettings: {
        cssVariables: { colors, fonts },
        generalSettings,
        globalTranslations,
        layoutSettings,
      },
      vendors,
      globalJs,
      globalScss,
    } = response;

    yield put(setLayoutSettings(layoutSettings));
    yield put(updateCssVariables({ colors, fonts }));
    yield put(setThemeGeneralSettings(generalSettings));
    yield put(setGlobalThemeScss(globalScss));
    yield put(setGlobalThemeJs(globalJs));
    yield put(setThemeVendors({ vendors: vendors as Vendor[] }));
    yield put(setGlobalThemeTranslation(globalTranslations));

    if (globalTranslations !== undefined && Object.keys(globalTranslations).length > 0) {
      yield put(setFileLanguageActive(Object.keys(globalTranslations)[0]));
    }

    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update')} ${i18n.t('general.successfully')}`);
  } catch (error) {
    yield put(activeThemeVeda.failure({ themeId }));
  }
}

export function* watchActiveThemeVeda() {
  yield takeLatest(getActionType(activeThemeVeda.request), handleActive);
}
