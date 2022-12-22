import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncGlobalOfTheme {
  themeParams: ReturnType<typeof handlePreviewInBuilderPage>['themeParams'];
}

export interface SyncGlobalOfThemeResult {
  statusSyncGlobalOfTheme: SyncFulfillStatus;
}

export function* syncGlobalOfTheme({ themeParams }: SyncGlobalOfTheme) {
  yield retry(3, 1000, shopifyConnectionService.writeGlobalOfThemeToShopify, { ...themeParams, isPreview: true });
  const statusSyncGlobalOfTheme: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)',
  );
  return { statusSyncGlobalOfTheme } as SyncGlobalOfThemeResult;
}
