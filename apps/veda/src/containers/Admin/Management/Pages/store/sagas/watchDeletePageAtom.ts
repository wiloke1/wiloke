import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { deletePageAtom } from 'services/PageService/Logic/deletePageAtom';
import { handleDeletePageInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';
import { deletePage, DeletePageResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { i18n } from 'translation';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { MODAL_REPORT_DELETE_PAGE_ERROR } from 'containers/ModalReportAfterError/const';
import { deletePageAtom as actionDeletePageAtom } from '../actions/actionPagesAtom';

function* handleDeletePageAtom({ payload }: ReturnType<typeof actionDeletePageAtom.request>) {
  const { onlyShopify, commandId, type, onFulfill } = payload;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);

  try {
    const { statusDeletePage }: DeletePageResult = yield call(deletePage, {
      deletePageParams: handleDeletePageInDashboard({ pageCommandId: commandId, pageType: type, eventId }),
    });
    if (statusDeletePage === 'success') {
      if (onlyShopify) {
        yield put(actionDeletePageAtom.success({ commandId, onlyShopify }));
        notifyAxiosHandler.handleSuccess(`${i18n.t('general.delete', { text: i18n.t('general.successfully') })}`);
      } else {
        const response: Awaited<ReturnType<typeof deletePageAtom>> = yield retry(3, 1000, deletePageAtom, { commandId });
        yield put(actionDeletePageAtom.success({ commandId, onlyShopify }));
        notifyAxiosHandler.handleSuccess(response.message);
      }
    } else {
      yield put(actionDeletePageAtom.failure({ commandId }));
    }
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionDeletePageAtom.failure({ commandId }));
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

export function* watchDeletePageAtom() {
  yield takeEvery(getActionType(actionDeletePageAtom.request), handleDeletePageAtom);
}
