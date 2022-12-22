import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { deletePageDraft } from 'services/PageService/Logic/deletePageDraft';
import { handleDeletePageInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { deletePage, DeletePageResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { i18n } from 'translation';
import { MODAL_REPORT_DELETE_PAGE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { deletePageDraft as actionDeletePageDraft } from '../actions/actionPagesDraft';

function* handleDeletePageDraft({ payload }: ReturnType<typeof actionDeletePageDraft.request>) {
  const { onlyShopify, commandId, type, onFulfill } = payload;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  try {
    const { statusDeletePage }: DeletePageResult = yield call(deletePage, {
      deletePageParams: handleDeletePageInDashboard({ pageCommandId: commandId, pageType: type, eventId }),
    });
    if (statusDeletePage === 'success') {
      if (onlyShopify) {
        yield put(actionDeletePageDraft.success({ commandId, onlyShopify }));
        notifyAxiosHandler.handleSuccess(`${i18n.t('general.delete', { text: i18n.t('general.successfully') })}`);
      } else {
        const response: Awaited<ReturnType<typeof deletePageDraft>> = yield retry(3, 1000, deletePageDraft, { commandId });
        yield put(actionDeletePageDraft.success({ commandId, onlyShopify }));
        notifyAxiosHandler.handleSuccess(response.message);
      }
    } else {
      yield put(actionDeletePageDraft.failure({ commandId }));
    }
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionDeletePageDraft.failure({ commandId }));
    ModalReportAfterError.getActions(MODAL_REPORT_DELETE_PAGE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.delete_page'),
      description: error_ instanceof Error ? error_.message : '',
    });
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}
export function* watchDeletePageDraft() {
  yield takeEvery(getActionType(actionDeletePageDraft.request), handleDeletePageDraft);
}
