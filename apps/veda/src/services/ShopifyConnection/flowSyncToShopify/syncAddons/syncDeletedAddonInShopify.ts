import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncDeletedAddonInShopify {
  deleteAddonParams: any;
}

export interface SyncDeletedAddonInShopifyResult {
  statusSyncDeletedAddonInShopify: SyncFulfillStatus;
}

export function* syncDeletedAddonInShopify({ deleteAddonParams }: SyncDeletedAddonInShopify) {
  yield retry(3, 1000, shopifyConnectionService.deleteAddonInShopify, { ...deleteAddonParams, isPreview: false });
  const statusDeleteAddon: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Delete addon khi save ở builder');
  return { statusSyncDeletedAddonInShopify: statusDeleteAddon } as SyncDeletedAddonInShopifyResult;
}
