import { createPublishStepLoading } from 'components/PublishStepLoading';
import { MODAL_REPORT_AFTER_SYNC_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { all, call, put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { handleSaveInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';
import {
  syncAddonsEnablePosition,
  SyncAddonsEnablePositionResult,
  syncAddonsDisablePosition,
  SyncAddonsDisablePositionResult,
} from 'services/ShopifyConnection/flowSyncToShopify/syncAddons';
import { syncGlobalOfThemeAndAtomicCss, SyncGlobalOfThemeAndAtomicCssResult } from 'services/ShopifyConnection/flowSyncToShopify/syncGlobalSettings';
import { syncHeaderFooter, SyncHeaderFooterResult } from 'services/ShopifyConnection/flowSyncToShopify/syncHeaderFooter';
import {
  syncPageInPageBuilderMode,
  SyncPageInPageBuilderModeResult,
  syncPagesInThemeBuilderMode,
  SyncPagesInThemeBuilderModeResult,
} from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { syncTranslations } from 'services/ShopifyConnection/flowSyncToShopify/syncTranslations';
import { liquidVariablesSelector, socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { getActionType } from 'wiloke-react-core/utils';
import { syncToShopify } from './actions';

export const syncPageNotification = createPublishStepLoading(6);

// NOTE: @tuong -> Ý tưởng rate limit hiện tại: Cứ mỗi chặng (step sync) cho dừng nửa giây
export function* handleSyncToShopify({ payload }: ReturnType<typeof syncToShopify.request>) {
  const { onSyncFulfill } = payload;
  try {
    const { result, isOverrideIndividualPages } = payload;
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
    }: ReturnType<typeof handleSaveInBuilderPage> = handleSaveInBuilderPage({
      data: result,
      eventId,
      isOverrideIndividualPages,
      themeName: theme?.name as string,
    });
    const { statusSyncTranslations }: SagaReturnType<typeof syncTranslations> = yield call(syncTranslations, { syncTranslationsParams });

    if (statusSyncTranslations === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('publish_shopify.translation') }));
    }

    syncPageNotification.next({
      title: 'Step 3',
      description: i18n.t('publish_shopify.syncing', { text: i18n.t('publish_shopify.text_to_shopify', { text: 'Atomic CSS' }) }),
    });

    const { statusSyncAtomicCss, statusSyncGlobalOfTheme }: SyncGlobalOfThemeAndAtomicCssResult = yield call(syncGlobalOfThemeAndAtomicCss, {
      atomicCssParams,
      themeParams,
    });

    if (statusSyncAtomicCss === 'failure' || statusSyncGlobalOfTheme === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('publish_shopify.theme_settings_or_atomic_css') }));
    }

    syncPageNotification.next({
      title: 'Step 4',
      description: i18n.t('publish_shopify.syncing', { text: i18n.t('publish_shopify.text_to_shopify', { text: i18n.t('general.addons') }) }),
    });

    const [{ statusSyncAddonsEnablePosition, signalToReplaceAddonInLiquidCode }, { statusSyncAddonsDisablePosition }]: [
      SyncAddonsEnablePositionResult,
      SyncAddonsDisablePositionResult,
    ] = yield all([call(syncAddonsEnablePosition, { addonsEnablePositionParams }), call(syncAddonsDisablePosition, { addonsDisablePositionParams })]);

    if (statusSyncAddonsEnablePosition === 'failure' || statusSyncAddonsDisablePosition === 'failure') {
      throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.addons') }));
    }

    if (result.builderType === 'page') {
      syncPageNotification.next({
        title: 'Step 5',
        description: i18n.t('publish_shopify.syncing', { text: i18n.t('publish_shopify.text_to_shopify', { text: i18n.t('general.page') }) }),
      });

      const { statusSyncPageInPageBuilderMode }: SyncPageInPageBuilderModeResult = yield call(syncPageInPageBuilderMode, {
        pagesParams,
        signalToReplaceAddonInLiquidCode,
      });

      if (statusSyncPageInPageBuilderMode === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.page') }));
      }
    } else if (result.builderType === 'theme' && headerFooterParams) {
      const { statusSyncHeaderFooter }: SyncHeaderFooterResult = yield call(syncHeaderFooter, { headerFooterParams });

      if (statusSyncHeaderFooter === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: `${i18n.t('general.header')} ${i18n.t('general.footer')}` }));
      }

      const { statusSyncPagesInThemeBuilderMode }: SyncPagesInThemeBuilderModeResult = yield call(syncPagesInThemeBuilderMode, {
        pagesParams,
        signalToReplaceAddonInLiquidCode,
      });

      if (statusSyncPagesInThemeBuilderMode === 'failure') {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: i18n.t('general.page') }));
      }
    }

    if (result.builderType === 'page') {
      syncPageNotification.next({
        title: 'Step 6',
        description: 'Active page status',
      });

      yield all(
        pagesParams.map(({ pageCommandId }) => {
          return pageCommandId ? retry(3, 1000, shopifyConnectionService.updatePageStatus, { pageCommandId }) : Promise.resolve();
        }),
      );
    }
    syncPageNotification.done();
    yield put(syncToShopify.success(undefined));
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      yield put(syncToShopify.failure(undefined));
      ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.sync_result_to_shopify'),
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

export function* watchSyncToShopify() {
  yield takeLeading(getActionType(syncToShopify.request), handleSyncToShopify);
}
