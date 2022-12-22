import { call } from 'redux-saga/effects';
import { handleSaveInBuilderPage } from 'services/ShopifyConnection';
import { syncTranslation, SyncTranslationResult } from './syncTranslation';

export interface SyncTranslations {
  syncTranslationsParams: ReturnType<typeof handleSaveInBuilderPage>['syncTranslationsParams'];
}

export interface SyncTranslationsResult {
  statusSyncTranslations: SyncFulfillStatus;
}
export function* syncTranslations({ syncTranslationsParams }: SyncTranslations) {
  for (const syncTranslationParams of syncTranslationsParams) {
    const { statusSyncTranslation }: SyncTranslationResult = yield call(syncTranslation, { syncTranslationParams });
    if (statusSyncTranslation !== 'success') {
      return { statusSyncTranslations: 'failure' } as SyncTranslationsResult;
    }
  }
  return { statusSyncTranslations: 'success' } as SyncTranslationsResult;
}
