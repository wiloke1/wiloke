import { call, put, retry, select, takeEvery } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { handleUpdateStatusPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { updateStatusPublish, UpdateStatusPublishResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { syncToShopify } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateStatusPageClientService } from 'services/PageService/Logic/updateStatusPageClient';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { MODAL_REPORT_UPDATE_STATUS_PAGE_ERROR } from 'containers/ModalReportAfterError/const';
import { i18n } from 'translation';
import { actionUpdateStatusArticlePage } from '../actions';

function* handleUpdate({ payload }: ReturnType<typeof actionUpdateStatusArticlePage.request>) {
  const { id, enable, adminPageData, isOverrideIndividualPages, onFulfill } = payload;
  try {
    const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
    const { statusSync }: UpdateStatusPublishResult = yield call(updateStatusPublish, {
      updateStatusPublishParams: handleUpdateStatusPage({
        eventId,
        data: adminPageData,
        isOverrideIndividualPages,
        isPublished: enable,
      }),
    });
    if (statusSync === 'success') {
      yield put(syncToShopify.success(undefined));
      const response: Awaited<ReturnType<typeof updateStatusPageClientService>> = yield retry(3, 1000, updateStatusPageClientService, {
        commandId: id,
        enable,
      });

      yield retry(3, 1000, shopifyConnectionService.updatePageStatus, { pageCommandId: id });

      yield put(
        actionUpdateStatusArticlePage.success({
          id: response.info.commandId,
          enable: response.info.enable,
          justDisabledPages: response.info.justDisabledPages,
          modifiedDateTimestamp: response.info.modifiedDateTimestamp,
        }),
      );
    } else {
      // @tuong -> Retry hoặc lưu nhật kí để thực hiện lại, ...
      yield put(actionUpdateStatusArticlePage.failure({ id }));
    }
  } catch (error) {
    yield put(actionUpdateStatusArticlePage.failure({ id: payload.id }));
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    ModalReportAfterError.getActions(MODAL_REPORT_UPDATE_STATUS_PAGE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.update_status_page'),
      description: error instanceof Error ? error.message : '',
    });
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchUpdateStatusArticlePage() {
  yield takeEvery(getActionType(actionUpdateStatusArticlePage.request), handleUpdate);
}
