import { call } from 'redux-saga/effects';
import { handleSaveInBuilderPage } from 'services/ShopifyConnection';
import { syncPage, SyncPage, SyncPageResult } from './syncPage';

export interface SyncPagesInThemeBuilderMode extends Pick<SyncPage, 'signalToReplaceAddonInLiquidCode'> {
  pagesParams: ReturnType<typeof handleSaveInBuilderPage>['pagesParams'];
}

export interface SyncPagesInThemeBuilderModeResult {
  statusSyncPagesInThemeBuilderMode: SyncFulfillStatus;
}

export function* syncPagesInThemeBuilderMode({ pagesParams, signalToReplaceAddonInLiquidCode }: SyncPagesInThemeBuilderMode) {
  for (const pageParams of pagesParams) {
    const { statusSyncPage }: SyncPageResult = yield call(syncPage, {
      pageParams,
      signalToReplaceAddonInLiquidCode,
    });
    if (statusSyncPage !== 'success') {
      return { statusSyncPagesInThemeBuilderMode: 'failure' } as SyncPagesInThemeBuilderModeResult;
    }
  }
  return { statusSyncPagesInThemeBuilderMode: 'success' } as SyncPagesInThemeBuilderModeResult;
}
