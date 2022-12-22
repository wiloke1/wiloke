import { AxiosError } from 'axios';
import { call, put, retry, select, takeLatest } from 'redux-saga/effects';
import { updateThemeSettingsClient } from 'services/ThemeService/Logic/updateThemeSettingsClient';
import { i18n } from 'translation';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { socketOfSyncShopifySelector, themeSettingsSelector } from 'store/selectors';
import { handleUpdateThemeSettingsInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { syncTranslations, SyncTranslationsResult } from 'services/ShopifyConnection/flowSyncToShopify/syncTranslations';
import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { MODAL_REPORT_SAVE_THEME_SETITNGS_IN_DASHBOARD_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { updateThemeActiveSettings } from './sliceThemeSettingsDashboard';

function* handleUpdate({ payload }: ReturnType<typeof updateThemeActiveSettings.request>) {
  const { commandId, body, onFulfill } = payload;
  try {
    yield retry(3, 1000, updateThemeSettingsClient, { commandId, themeSettings: body });
    yield put(updateThemeActiveSettings.success(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);

    const themeSettingsState: ReturnType<typeof themeSettingsSelector> = yield select(themeSettingsSelector);
    const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
    const { themeParams, syncTranslationsParams }: Awaited<ReturnType<typeof handleUpdateThemeSettingsInDashboard>> = yield call(
      handleUpdateThemeSettingsInDashboard,
      {
        themeSettings: {
          cssVariables: {
            colors: themeSettingsState.cssVariables.colors,
            fonts: themeSettingsState.cssVariables.fonts,
          },
          generalSettings: themeSettingsState.generalSettings,
          globalJs: themeSettingsState.globalJs,
          globalScss: themeSettingsState.globalScss,
          layoutSettings: themeSettingsState.layoutSettings,
          vendors: themeSettingsState.vendors,
          globalTranslations: themeSettingsState.globalTranslations,
        },
        eventId,
      },
    );

    const { statusSyncTranslations }: SyncTranslationsResult = yield call(syncTranslations, { syncTranslationsParams });

    yield retry(3, 1000, shopifyConnectionService.writeGlobalOfThemeToShopify, { ...themeParams, isPreview: false });
    const statusSyncGlobal: Status = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Ghi file khi update theme settings ngoài dashboard');
    if (statusSyncGlobal === 'failure' || statusSyncTranslations === 'failure') {
      notifyAxiosHandler.handleError(new Error(i18n.t('publish_shopify.sync_error')));
    }
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(updateThemeActiveSettings.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_THEME_SETITNGS_IN_DASHBOARD_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_theme_setting_in_dashboard'),
      description: error instanceof Error ? error.message : '',
    });
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchUpdateThemeActiveSettings() {
  yield takeLatest(getActionType(updateThemeActiveSettings.request), handleUpdate);
}
