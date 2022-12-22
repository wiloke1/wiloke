import { call, delay, put, retry, select, takeLatest } from 'redux-saga/effects';
import { handleDeletePageInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { deletePage, DeletePageResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { deletePageClient } from 'services/PageService/Logic/deletePageClient';
import { syncToShopify } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { PageType } from 'types/Page';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { MODAL_REPORT_DELETE_PAGE_ERROR } from 'containers/ModalReportAfterError/const';
import { i18n } from 'translation';
import { deleteTemplatePage } from '../reducers/actions';

function* handleDeleteOnePage(id: string, pageType: PageType) {
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  const { statusDeletePage }: DeletePageResult = yield call(deletePage, {
    deletePageParams: handleDeletePageInDashboard({ pageCommandId: id, pageType, eventId }),
  });
  if (statusDeletePage === 'success') {
    const response: Awaited<ReturnType<typeof deletePageClient>> = yield retry(3, 1000, deletePageClient, { commandId: id });
    // Rate limit shopify
    yield delay(500);
    yield put(deleteTemplatePage.success({ commandId: id }));
    yield put(syncToShopify.success(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
  } else {
    // @tuong -> Retry hoặc lưu nhật kí để thực hiện lại, ...
    yield put(deleteTemplatePage.failure({ commandId: id }));
  }
}

function* handleDelete({ payload }: ReturnType<typeof deleteTemplatePage.request>) {
  const { commandId, pageType, onFulfill } = payload;
  try {
    yield call(handleDeleteOnePage, commandId, pageType);
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    ModalReportAfterError.getActions(MODAL_REPORT_DELETE_PAGE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.delete_page'),
      description: error instanceof Error ? error.message : '',
    });
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchDeleteTemplatePage() {
  yield takeLatest(getActionType(deleteTemplatePage.request), handleDelete);
}
