import { call } from 'redux-saga/effects';
import { handlePreviewInBuilderPage } from 'services/ShopifyConnection';
import { syncPage, SyncPage, SyncPageResult } from './syncPage';

export interface SyncPageInPageBuilderMode extends Pick<SyncPage, 'signalToReplaceAddonInLiquidCode'> {
  pagesParams: ReturnType<typeof handlePreviewInBuilderPage>['pagesParams'];
}

export interface SyncPageInPageBuilderModeResult {
  statusSyncPageInPageBuilderMode: SyncFulfillStatus;
}

/** Page builder -> Mỗi lần chỉ có thể edit và save 1 page -> "pagesParams[0]" */
export function* syncPageInPageBuilderMode({ pagesParams, signalToReplaceAddonInLiquidCode }: SyncPageInPageBuilderMode) {
  const { statusSyncPage }: SyncPageResult = yield call(syncPage, {
    pageParams: pagesParams[0],
    signalToReplaceAddonInLiquidCode,
  });
  return { statusSyncPageInPageBuilderMode: statusSyncPage } as SyncPageInPageBuilderModeResult;
}
