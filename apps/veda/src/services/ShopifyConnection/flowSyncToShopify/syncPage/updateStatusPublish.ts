import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { handleUpdateStatusPage } from 'services/ShopifyConnection/handleUpdateStatusPage';

export interface UpdateStatusPublish {
  updateStatusPublishParams: ReturnType<typeof handleUpdateStatusPage>;
}

export interface UpdateStatusPublishResult {
  statusSync: SyncFulfillStatus;
}

export function* updateStatusPublish({ updateStatusPublishParams }: UpdateStatusPublish) {
  yield retry(3, 1000, shopifyConnectionService.writePageToShopify, { ...updateStatusPublishParams, isPreview: false });
  const statusSync: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Publish | Unpublish page ngoài dashboard');
  return { statusSync } as UpdateStatusPublishResult;
}
