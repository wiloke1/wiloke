import { AxiosError } from 'axios';
import { setAskBeforeSaveVisible } from 'containers/ModalAskBeforeSave';
import { call, put, retry, select, takeLatest } from 'redux-saga/effects';
import { handleUpdatePageSettingInDashboard, handleUpdateShopifyPagesInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { syncGlobalOfPageInDashboard, SyncGlobalOfPageInDashboardResult } from 'services/ShopifyConnection/flowSyncToShopify/syncGlobalSettings';
import { updateShopifyPages, UpdateShopifyPagesResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage/updateShopifyPages';
import { updatePageSettingsClient } from 'services/PageService/Logic/updatePageSettingsClient';
import { syncToShopify } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { PageSettings } from 'types/Result';
import customLog from 'utils/functions/log';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { i18n } from 'translation';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { MODAL_REPORT_SAVE_PAGE_SETITNGS_IN_DASHBOARD_ERROR } from 'containers/ModalReportAfterError/const';
import { changeSettingsDashboardPage, updatePageSettings } from '.';

export function* handleUpdate({ payload }: ReturnType<typeof updatePageSettings.request>) {
  const { page, originPage, variant, isOverrideIndividualPages, callback, onFulfill } = payload;
  const { commandId, pageSettings, shopifyPages, shopifyRepresentPage } = page;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);

  if (variant === 'Update page settings') {
    try {
      const response: Awaited<ReturnType<typeof updatePageSettingsClient>> = yield retry(3, 1000, updatePageSettingsClient, {
        commandId,
        pageSettings: pageSettings as PageSettings,
      });

      const parameters: Awaited<ReturnType<typeof handleUpdatePageSettingInDashboard>> = yield call(handleUpdatePageSettingInDashboard, {
        data: page,
        eventId,
        isOverrideIndividualPages,
      });
      const { statusSyncGlobalOfPageInDashboard }: SyncGlobalOfPageInDashboardResult = yield call(syncGlobalOfPageInDashboard, {
        globalPageSettingsParams: parameters,
      });
      if (statusSyncGlobalOfPageInDashboard === 'success') {
        yield put(syncToShopify.success(undefined));
        const additionOfPage: Awaited<ReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify>> = yield retry(
          3,
          1000,
          shopifyConnectionService.getAdditionalDataRelateToShopify,
          { pageCommandId: commandId },
        );
        yield put(
          updatePageSettings.success({
            ...response.info,
            parentCommandId: response.info.parentCommandId ?? '',
            shopifyPages: !additionOfPage ? shopifyPages : additionOfPage.info.isApplyToAll ? 'all' : additionOfPage.info.shopifyPages,
            shopifyRepresentPage: !additionOfPage ? shopifyRepresentPage : additionOfPage.info.shopifyRepresentPage,
            isOverrideIndividualPages: additionOfPage.info.isOverrideIndividualPages,
          }),
        );
        notifyAxiosHandler.handleSuccess(response.message);
        yield put(setAskBeforeSaveVisible(false));
        yield put(changeSettingsDashboardPage({ visible: false, page: undefined, isChangingHandle: false }));
        callback?.();
      } else {
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: page.label }));
      }
    } catch (error) {
      yield put(updatePageSettings.failure({ commandId }));
      notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
      ModalReportAfterError.getActions(MODAL_REPORT_SAVE_PAGE_SETITNGS_IN_DASHBOARD_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.save_page_setting_in_dashboard'),
        description: error instanceof Error ? error.message : '',
      });
    } finally {
      onFulfill();
      try {
        yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
      } catch {}
    }
  }
  if (variant === 'Update shopify pages') {
    try {
      const { statusSync }: UpdateShopifyPagesResult = yield call(updateShopifyPages, {
        updateShopifyPagesParams: handleUpdateShopifyPagesInDashboard({
          isOverrideIndividualPages,
          prevData: originPage,
          data: page,
          eventId,
        }),
      });
      if (statusSync === 'success') {
        yield put(syncToShopify.success(undefined));
        const additionOfPage: Awaited<ReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify>> = yield retry(
          3,
          1000,
          shopifyConnectionService.getAdditionalDataRelateToShopify,
          {
            pageCommandId: commandId,
          },
        );

        yield put(
          updatePageSettings.success({
            ...page,
            shopifyPages: additionOfPage.info.isApplyToAll ? 'all' : additionOfPage.info.shopifyPages,
            shopifyRepresentPage: additionOfPage.info.shopifyRepresentPage,
          }),
        );
        yield put(setAskBeforeSaveVisible(false));
        yield put(
          changeSettingsDashboardPage({
            page: undefined,
            originPage: undefined,
            isChangingHandle: false,
            visibleListProduct: false,
            visibleListCollection: false,
            visibleListBlog: false,
          }),
        );
      } else {
        // @tuong -> Retry hoặc lưu nhật kí để thực hiện lại, ...
        throw new Error(i18n.t('publish_shopify.sync_something_error', { text: page.label }));
      }
    } catch (error) {
      yield put(updatePageSettings.failure({ commandId }));
      notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
      customLog('watchUpdatePageSettings', `${(error as AxiosError<ErrorData>).response?.data.message}`);
      ModalReportAfterError.getActions(MODAL_REPORT_SAVE_PAGE_SETITNGS_IN_DASHBOARD_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.save_page_setting_in_dashboard'),
        description: error instanceof Error ? error.message : '',
      });
    } finally {
      onFulfill();
      try {
        yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
      } catch {}
    }
  }
}

export function* watchUpdatePageSettings() {
  yield takeLatest(getActionType(updatePageSettings.request), handleUpdate);
}
