import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncAtomicCss {
  atomicCssParams: ReturnType<typeof handlePreviewInBuilderPage>['atomicCssParams'];
}

export interface SyncAtomicCssResult {
  statusSyncAtomicCss: SyncFulfillStatus;
}

export function* syncAtomicCss({ atomicCssParams }: SyncAtomicCss) {
  yield retry(3, 1000, shopifyConnectionService.writeAtomicCssToShopify, { ...atomicCssParams, isPreview: true });
  const statusSyncAtomicCss: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)',
  );
  return { statusSyncAtomicCss } as SyncAtomicCssResult;
}
