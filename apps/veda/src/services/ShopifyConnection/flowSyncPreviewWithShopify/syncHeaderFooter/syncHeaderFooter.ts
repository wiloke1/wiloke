import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncHeaderFooter {
  headerFooterParams: Exclude<ReturnType<typeof handlePreviewInBuilderPage>['headerFooterParams'], undefined>;
}

export interface SyncHeaderFooterResult {
  statusSyncHeaderFooter: SyncFulfillStatus;
}

export function* syncHeaderFooter({ headerFooterParams }: SyncHeaderFooter) {
  yield retry(3, 1000, shopifyConnectionService.writeHeaderFooterToShopify, { ...headerFooterParams, isPreview: true });
  const statusSyncHeaderFooter: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi save ở builder page / Ghi header footer',
  );
  return { statusSyncHeaderFooter } as SyncHeaderFooterResult;
}
