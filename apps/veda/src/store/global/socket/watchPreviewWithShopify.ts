import { createPublishStepLoading } from 'components/PublishStepLoading';
import { ModalLoginShopifyBeforePreview } from 'containers/BuilderPage/components/ModalLoginShopifyBeforePreview/ModalLoginShopifyBeforePreview';
import { MODAL_REPORT_AFTER_SYNC_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { all, call, put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';
import {
  syncAddonsEnablePosition,
  SyncAddonsEnablePositionResult,
  syncAddonsDisablePosition,
  SyncAddonsDisablePositionResult,
} from 'services/ShopifyConnection/flowSyncPreviewWithShopify/syncAddons';
import {
  syncGlobalOfThemeAndAtomicCss,
  SyncGlobalOfThemeAndAtomicCssResult,
} from 'services/ShopifyConnection/flowSyncPreviewWithShopify/syncGlobalSettings';
import { syncHeaderFooter, SyncHeaderFooterResult } from 'services/ShopifyConnection/flowSyncPreviewWithShopify/syncHeaderFooter';
import {
  syncPageInPageBuilderMode,
  SyncPageInPageBuilderModeResult,
  syncPagesInThemeBuilderMode,
  SyncPagesInThemeBuilderModeResult,
} from 'services/ShopifyConnection/flowSyncPreviewWithShopify/syncPage';
import { syncTranslations } from 'services/ShopifyConnection/flowSyncPreviewWithShopify/syncTranslations';
import { liquidVariablesSelector, socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { getActionType } from 'wiloke-react-core/utils';
import { previewWithShopify } from './actions';

export const syncPageNotification = createPublishStepLoading(6);

// NOTE: @tuong -> Ý tưởng rate limit hiện tại: Cứ mỗi chặng (step sync) cho dừng nửa giây
export function* handlePreviewWithShopify({ payload }: ReturnType<typeof previewWithShopify.request>) {
  if (!ModalLoginShopifyBeforePreview.isExecuted) {
    ModalLoginShopifyBeforePreview.open();
    yield put(previewWithShopify.success(undefined));
    return;
  }
  const { onSyncFulfill } = payload;
  try {
    const { result } = payload;
    const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);

    const { data }: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
    const { theme } = data;

    const {
      pagesParams,
      themeParams,
      headerFooterParams,
      atomicCssParams,
      addonsEnablePositionParams,
      addonsDisablePositionParams,
      syncTranslationsParams,
    }: ReturnType<typeof handlePreviewInBuilderPage> = handlePreviewInBuilderPage({
      data: result,
      eventId,
      themeName: theme?.name as string,
    });
    const [
      { statusSyncTranslations },
      { statusSyncAtomicCss, statusSyncGlobalOfTheme },
      { statusSyncAddonsDisablePosition },
      { statusSyncAddonsEnablePosition, signalToReplaceAddonInLiquidCode },
    ]: [
      SagaReturnType<typeof syncTranslations>,
      SyncGlobalOfThemeAndAtomicCssResult,
      SyncAddonsDisablePositionResult,
      SyncAddonsEnablePositionResult,
    ] = yield all([
      call(syncTranslations, { syncTranslationsParams }),
      call(syncGlobalOfThemeAndAtomicCss, { atomicCssParams, themeParams }),
      call(syncAddonsDisablePosition, { addonsDisablePositionParams }),
      call(syncAddonsEnablePosition, { addonsEnablePositionParams }),
    ]);

    if (statusSyncTranslations === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('publish_shopify.translation') }));
    }

    if (statusSyncAtomicCss === 'failure' || statusSyncGlobalOfTheme === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('publish_shopify.theme_settings_or_atomic_css') }));
    }

    if (statusSyncAddonsDisablePosition === 'failure' || statusSyncAddonsEnablePosition === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.addons') }));
    }

    if (result.builderType === 'page') {
      const { statusSyncPageInPageBuilderMode }: SyncPageInPageBuilderModeResult = yield call(syncPageInPageBuilderMode, {
        pagesParams,
        signalToReplaceAddonInLiquidCode,
      });
      if (statusSyncPageInPageBuilderMode === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.page') }));
      }
    } else if (result.builderType === 'theme' && headerFooterParams) {
      const [{ statusSyncHeaderFooter }, { statusSyncPagesInThemeBuilderMode }]: [
        SyncHeaderFooterResult,
        SyncPagesInThemeBuilderModeResult,
      ] = yield all([
        call(syncHeaderFooter, { headerFooterParams }),
        call(syncPagesInThemeBuilderMode, { pagesParams, signalToReplaceAddonInLiquidCode }),
      ]);
      if (statusSyncHeaderFooter === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: `${i18n.t('general.header')} ${i18n.t('general.footer')}` }));
      }

      if (statusSyncPagesInThemeBuilderMode === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.page') }));
      }
    }

    yield put(previewWithShopify.success(undefined));
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      yield put(previewWithShopify.failure(undefined));
      ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.migrate_theme'),
        description: err instanceof Error ? err.message : '',
      });
    }
  } finally {
    onSyncFulfill?.();
    syncPageNotification.done();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchPreviewWithShopify() {
  yield takeLeading(getActionType(previewWithShopify.request), handlePreviewWithShopify);
}
