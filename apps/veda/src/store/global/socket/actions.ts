import { GetAdditionalDataRelateToShopify_BEExpectResponse } from 'services/ShopifyConnection';
import { Result } from 'types/Result';
import { SocketMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { createAction, createAsyncAction, createDispatchAsyncAction, createDispatchAction } from 'wiloke-react-core/utils';
import { ImportThemeAtomToClientServiceMessage } from 'hooks/useSocket/useSocketForImportThemeAtomToClientService';

export const setEventIdOfSyncShopify = createAction('@syncShopify/setEventIdOfSyncShopify', (eventId: string) => eventId);

export const syncToShopify = createAsyncAction(['@syncShopify/syncing', '@syncShopify/synced', '@syncShopify/syncFailure'])<
  {
    result: Result;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
    onSyncFulfill?: () => void;
  },
  undefined,
  undefined
>();

export const previewWithShopify = createAsyncAction(['@previewWithShopify/syncing', '@previewWithShopify/synced', '@previewWithShopify/syncFailure'])<
  { result: Result; onSyncFulfill?: () => void },
  undefined,
  undefined
>();

export const setStreamSocketOfSyncShopify = createAction(
  '@syncShopify/setStreamSocketOfSyncShopify',
  (payload: { eventType: SocketMessage['eventType']; status: Status; message: SocketMessage | undefined }) => payload,
);

export const resetSyncToShopifyStatus = createAction('@syncShopify/resetSyncToShopifyStatus');
export const resetPreviewWithShopifyStatus = createAction('@previewWithShopify/resetPreviewWithShopifyStatus');

export const setStreamSocketOfImportThemeAtomToClientService = createAction(
  '@importThemeAtomToClientService/setStreamSocketOfImportThemeAtomToClientService',
  (payload: {
    eventType: ImportThemeAtomToClientServiceMessage['eventType'];
    status: Status;
    message: ImportThemeAtomToClientServiceMessage | undefined;
  }) => {
    return { ...payload };
  },
);
export const setEventIdOfImportThemeAtomToClientService = createAction(
  '@importThemeAtomToClientService/setEventIdOfSyncShopify',
  (eventId: string) => eventId,
);

export const useSetEventIdOfSyncShopify = createDispatchAction(setEventIdOfSyncShopify);
export const useSyncToShopify = createDispatchAsyncAction(syncToShopify);
export const usePreviewWithShopify = createDispatchAsyncAction(previewWithShopify);
export const useSetStreamSocketOfSyncShopify = createDispatchAction(setStreamSocketOfSyncShopify);
export const useResetSyncToShopifyStatus = createDispatchAction(resetSyncToShopifyStatus);
export const useResetPreviewWithShopifyStatus = createDispatchAction(resetPreviewWithShopifyStatus);
export const useSetStreamSocketOfImportThemeAtomToClientService = createDispatchAction(setStreamSocketOfImportThemeAtomToClientService);
export const useSetEventIdOfImportThemeAtomToClientService = createDispatchAction(setEventIdOfImportThemeAtomToClientService);
