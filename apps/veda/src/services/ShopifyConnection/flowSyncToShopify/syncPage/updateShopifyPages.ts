import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { handleUpdateShopifyPagesInDashboard } from 'services/ShopifyConnection/handleUpdateShopifyPagesInDashboard';

export interface UpdateShopifyPages {
  updateShopifyPagesParams: ReturnType<typeof handleUpdateShopifyPagesInDashboard>;
}

export interface UpdateShopifyPagesResult {
  statusSync: SyncFulfillStatus;
}

export function* updateShopifyPages({ updateShopifyPagesParams }: UpdateShopifyPages) {
  const { unpublishAllParameters, updateShopifyPagesParameters } = updateShopifyPagesParams;

  if (unpublishAllParameters) {
    yield retry(3, 1000, shopifyConnectionService.writePageToShopify, { ...unpublishAllParameters, isPreview: false });
    const statusSyncUnpublishAll: SyncFulfillStatus = yield call(
      handleWaitForSocketOfSyncShopifyFulfill,
      'Update shopifyPages ngoài dashboard/Từ "all" -> 1 vài => Unpublish tất cả',
    );
    if (statusSyncUnpublishAll !== 'success') {
      return { statusSync: 'failure' } as UpdateShopifyPagesResult;
    }
  }
  yield retry(3, 1000, shopifyConnectionService.writePageToShopify, { ...updateShopifyPagesParameters, isPreview: false });
  const statusSync: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Update shopifyPages ngoài dashboard');

  return { statusSync } as UpdateShopifyPagesResult;
}
