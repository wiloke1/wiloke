import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { handleDeletePageInDashboard } from 'services/ShopifyConnection/handleDeletePageInDashboard';

export interface DeletePage {
  deletePageParams: ReturnType<typeof handleDeletePageInDashboard>;
}

export interface DeletePageResult {
  statusDeletePage: SyncFulfillStatus;
}

export function* deletePage({ deletePageParams }: DeletePage) {
  yield retry(3, 1000, shopifyConnectionService.deletePageInShopify, deletePageParams);
  const statusDeletePage: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Delete ouput builder ngoài dashboard');
  return { statusDeletePage } as DeletePageResult;
}
