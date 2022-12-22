import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { handleUpdateStatusPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { updateStatusPublish, UpdateStatusPublishResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { disableShopifyPageAtom } from '../actions/actionPagesAtom';

function* handleDisableShopifyPageAtom({ payload }: ReturnType<typeof disableShopifyPageAtom.request>) {
  const { commandId, data, onFulfill } = payload;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  try {
    const { statusSync }: UpdateStatusPublishResult = yield call(updateStatusPublish, {
      updateStatusPublishParams: handleUpdateStatusPage({
        eventId,
        isPublished: false,
        isOverrideIndividualPages: true,
        data: {
          type: data.type,
          commandId: data.commandId,
          enable: false,
          image: data.image,
          isOverrideIndividualPages: true,
          label: data.label,
          pageSettings: data.pageSettings,
          sectionCommandIds: data.sectionCommandIds,
          parentCommandId: '',
        },
      }),
    });
    if (statusSync === 'success') {
      yield put(disableShopifyPageAtom.success({ commandId }));
      notifyAxiosHandler.handleSuccess(`${i18n.t('general.disable', { text: i18n.t('general.successfully') })}`);
    } else {
      yield put(disableShopifyPageAtom.failure({ commandId }));
    }
  } catch (error) {
    console.log('watchDisableShopifyPageAtom', error);
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(disableShopifyPageAtom.failure({ commandId }));
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchDisableShopifyPageAtom() {
  yield takeEvery(getActionType(disableShopifyPageAtom.request), handleDisableShopifyPageAtom);
}
