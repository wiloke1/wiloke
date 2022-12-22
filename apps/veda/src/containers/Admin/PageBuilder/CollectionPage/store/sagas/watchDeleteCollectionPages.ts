import { call, delay, put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { changeModalAdminSettings } from 'containers/Admin/Modals';
import { MODAL_REPORT_DELETE_PAGE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { deletePageClient } from 'services/PageService/Logic/deletePageClient';
import { handleDeletePageInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { deletePage, DeletePageResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { handleGetPageCounter } from 'store/global/pageCounter/sagas/watchGetPageCounter';
import { syncToShopify } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionDeleteCollectionPages } from '../actions';

function* handleDeleteOnePage(id: string) {
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  const { statusDeletePage }: DeletePageResult = yield call(deletePage, {
    deletePageParams: handleDeletePageInDashboard({ pageCommandId: id, pageType: 'collection', eventId }),
  });
  if (statusDeletePage === 'success') {
    const response: Awaited<ReturnType<typeof deletePageClient>> = yield retry(3, 1000, deletePageClient, { commandId: id });
    // Rate limit shopify
    yield delay(500);
    yield put(actionDeleteCollectionPages.success({ ids: [id] }));
    yield put(syncToShopify.success(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
  } else {
    // @tuong -> Retry hoặc lưu nhật kí để thực hiện lại, ...
    yield put(actionDeleteCollectionPages.failure({ id }));
  }
}

function* handleCreate({ payload }: ReturnType<typeof actionDeleteCollectionPages.request>) {
  const { ids, onFulfill } = payload;
  try {
    for (const pageId of ids) {
      // Xoá từng page mà không dùng .all -> để có thể kiểm soát rate limit
      // Tách như thế này để có thể thêm delay tại đây -> Kiểm soát được rate limit
      yield call(handleDeleteOnePage, pageId);
    }
    yield put(changeModalAdminSettings({ deleteCollection: false }));
    yield call(handleGetPageCounter, { type: '@Global/getPageCounter/request', payload: undefined });
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

export function* watchDeleteCollectionPages() {
  yield takeLatest(getActionType(actionDeleteCollectionPages.request), handleCreate);
}
