import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handleSaveInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncGlobalOfThemeInDashboard {
  themeParams: ReturnType<typeof handleSaveInBuilderPage>['themeParams'];
}

export interface SyncGlobalOfThemeInDashboardResult {
  statusSyncGlobalOfThemeInDashboard: SyncFulfillStatus;
}

export function* syncGlobalOfThemeInDashboard({ themeParams }: SyncGlobalOfThemeInDashboard) {
  yield retry(3, 1000, shopifyConnectionService.writeGlobalOfThemeToShopify, { ...themeParams, isPreview: false });
  const statusSyncGlobalOfThemeInDashboard: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)',
  );
  return { statusSyncGlobalOfThemeInDashboard } as SyncGlobalOfThemeInDashboardResult;
}
