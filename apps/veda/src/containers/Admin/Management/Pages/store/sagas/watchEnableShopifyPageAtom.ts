import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { handleUpdateStatusPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { updateStatusPublish, UpdateStatusPublishResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { enableShopifyPageAtom } from '../actions/actionPagesAtom';

function* handleEnableShopifyPageAtom({ payload }: ReturnType<typeof enableShopifyPageAtom.request>) {
  const { commandId, data, onFulfill } = payload;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  try {
    const { statusSync }: UpdateStatusPublishResult = yield call(updateStatusPublish, {
      updateStatusPublishParams: handleUpdateStatusPage({
        eventId,
        isPublished: true,
        isOverrideIndividualPages: true,
        data: {
          type: data.type,
          commandId: data.commandId,
          enable: true,
          image: data.image,
          isOverrideIndividualPages: true,
          label: data.label,
          pageSettings: data.pageSettings,
          parentCommandId: '',
          sectionCommandIds: data.sectionCommandIds,
        },
      }),
    });
    if (statusSync === 'success') {
      yield put(enableShopifyPageAtom.success({ commandId }));
      notifyAxiosHandler.handleSuccess(`${i18n.t('general.enable', { text: i18n.t('general.successfully') })}`);
    } else {
      yield put(enableShopifyPageAtom.failure({ commandId }));
    }
  } catch (error) {
    const error_ = error as Error;
    console.log('watchEnableShopifyPageAtom', error);
    notifyAxiosHandler.handleError(error_);
    yield put(enableShopifyPageAtom.failure({ commandId }));
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchEnableShopifyPageAtom() {
  yield takeEvery(getActionType(enableShopifyPageAtom.request), handleEnableShopifyPageAtom);
}
