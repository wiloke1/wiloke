import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncTranslation {
  syncTranslationParams: ReturnType<typeof handlePreviewInBuilderPage>['syncTranslationsParams'][number];
}

export interface SyncTranslationResult {
  statusSyncTranslation: SyncFulfillStatus;
}

export function* syncTranslation({ syncTranslationParams }: SyncTranslation) {
  yield retry(3, 1000, shopifyConnectionService.syncTranslation, { ...syncTranslationParams, isPreview: true });
  const statusSyncTranslation: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Sync translation');
  return { statusSyncTranslation } as SyncTranslationResult;
}
