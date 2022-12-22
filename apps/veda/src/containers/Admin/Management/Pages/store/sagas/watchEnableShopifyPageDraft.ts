import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { handleUpdateStatusPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { updateStatusPublish, UpdateStatusPublishResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { enableShopifyPageDraft } from '../actions/actionPagesDraft';

function* handleEnableShopifyPageDraft({ payload }: ReturnType<typeof enableShopifyPageDraft.request>) {
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
          parentCommandId: data.parentCommandId ?? '',
          sectionCommandIds: data.sectionCommandIds,
        },
      }),
    });
    if (statusSync === 'success') {
      yield put(enableShopifyPageDraft.success({ commandId }));
      notifyAxiosHandler.handleSuccess(`${i18n.t('general.enable', { text: i18n.t('general.successfully') })}`);
    } else {
      yield put(enableShopifyPageDraft.failure({ commandId }));
    }
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(enableShopifyPageDraft.failure({ commandId }));
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchEnableShopifyPageDraft() {
  yield takeEvery(getActionType(enableShopifyPageDraft.request), handleEnableShopifyPageDraft);
}
