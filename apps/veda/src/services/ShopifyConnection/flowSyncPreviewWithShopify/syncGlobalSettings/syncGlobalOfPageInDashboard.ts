import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handleUpdatePageSettingInDashboard, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncGlobalOfPageInDashboard {
  globalPageSettingsParams: Awaited<ReturnType<typeof handleUpdatePageSettingInDashboard>>;
}

export interface SyncGlobalOfPageInDashboardResult {
  statusSyncGlobalOfPageInDashboard: SyncFulfillStatus;
}

export function* syncGlobalOfPageInDashboard({ globalPageSettingsParams }: SyncGlobalOfPageInDashboard) {
  yield retry(3, 1000, shopifyConnectionService.writeGlobalOfPageToShopify, { ...globalPageSettingsParams, isPreview: true });
  const statusSyncGlobalOfPageInDashboard: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi update page settings ngoài dashboard',
  );
  return { statusSyncGlobalOfPageInDashboard } as SyncGlobalOfPageInDashboardResult;
}
