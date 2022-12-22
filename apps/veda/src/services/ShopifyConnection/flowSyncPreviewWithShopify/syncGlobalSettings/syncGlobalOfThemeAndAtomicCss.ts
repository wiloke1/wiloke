import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { all, call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncGlobalOfThemeAndAtomicCss {
  themeParams: ReturnType<typeof handlePreviewInBuilderPage>['themeParams'];
  atomicCssParams: ReturnType<typeof handlePreviewInBuilderPage>['atomicCssParams'];
}

export interface SyncGlobalOfThemeAndAtomicCssResult {
  statusSyncGlobalOfTheme: SyncFulfillStatus;
  statusSyncAtomicCss: SyncFulfillStatus;
}

/** Sync global (cái được sinh ra từ themeSettings) và atomic css */
export function* syncGlobalOfThemeAndAtomicCss({ themeParams, atomicCssParams }: SyncGlobalOfThemeAndAtomicCss) {
  yield all([
    retry(3, 1000, shopifyConnectionService.writeGlobalOfThemeToShopify, { ...themeParams, isPreview: true }),
    retry(3, 1000, shopifyConnectionService.writeAtomicCssToShopify, { ...atomicCssParams, isPreview: true }),
  ]);
  const [statusSyncGlobalOfTheme, statusSyncAtomicCss]: [Status, Status] = yield all([
    call(handleWaitForSocketOfSyncShopifyFulfill, 'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)'),
    call(handleWaitForSocketOfSyncShopifyFulfill, 'Ghi file atomic css khi save ở builder page'),
  ]);

  return {
    statusSyncGlobalOfTheme,
    statusSyncAtomicCss,
  } as SyncGlobalOfThemeAndAtomicCssResult;
}
