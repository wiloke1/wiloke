import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { handleUpdateStatusPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { updateStatusPublish, UpdateStatusPublishResult } from 'services/ShopifyConnection/flowSyncToShopify/syncPage';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { disableShopifyPageDraft } from '../actions/actionPagesDraft';

function* handleDisableShopifyPageDraft({ payload }: ReturnType<typeof disableShopifyPageDraft.request>) {
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
          parentCommandId: data.parentCommandId ?? '',
        },
      }),
    });
    if (statusSync === 'success') {
      yield put(disableShopifyPageDraft.success({ commandId }));
      notifyAxiosHandler.handleSuccess(`${i18n.t('general.disable', { text: i18n.t('general.successfully') })}`);
    } else {
      yield put(disableShopifyPageDraft.failure({ commandId }));
    }
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(disableShopifyPageDraft.failure({ commandId }));
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchDisableShopifyPageDraft() {
  yield takeEvery(getActionType(disableShopifyPageDraft.request), handleDisableShopifyPageDraft);
}
