import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getPagesDraft = createAsyncAction([
  '@PageManager/getPagesDraft/request',
  '@PageManager/getPagesDraft/success',
  '@PageManager/getPagesDraft/failure',
])<undefined, { hasNextPage: boolean; data: DevPageDatabase[] }, undefined>();

export const loadMorePagesDraft = createAsyncAction([
  '@PageManager/loadMorePagesDraft/request',
  '@PageManager/loadMorePagesDraft/success',
  '@PageManager/loadMorePagesDraft/failure',
])<{ cursor: string }, { hasNextPage: boolean; data: DevPageDatabase[] }, undefined>();

export const approvePageDraft = createAsyncAction([
  '@PageManager/approvePageDraft/request',
  '@PageManager/approvePageDraft/success',
  '@PageManager/approvePageDraft/failure',
])<{ commandId: DevPageDatabase['commandId'] }, { commandId: DevPageDatabase['commandId'] }, { commandId: DevPageDatabase['commandId'] }>();

export const rejectPageDraft = createAsyncAction([
  '@PageManager/rejectPageDraft/request',
  '@PageManager/rejectPageDraft/success',
  '@PageManager/rejectPageDraft/failure',
])<
  { item: DevPageDatabase; message: string },
  { commandId: DevPageDatabase['commandId']; newItem: DevPageDatabase },
  { commandId: DevPageDatabase['commandId'] }
>();

export const deletePageDraft = createAsyncAction([
  '@PageManager/deletePageDraft/request',
  '@PageManager/deletePageDraft/success',
  '@PageManager/deletePageDraft/failure',
])<
  {
    onlyShopify: boolean;
    commandId: DevPageDatabase['commandId'];
    name: DevPageDatabase['label'];
    type: DevPageDatabase['type'];
    onFulfill: () => void;
  },
  { onlyShopify: boolean; commandId: DevPageDatabase['commandId'] },
  { commandId: DevPageDatabase['commandId'] }
>();

export const forkPageAtom = createAsyncAction([
  '@PageManager/forkPageAtom/request',
  '@PageManager/forkPageAtom/success',
  '@PageManager/forkPageAtom/failure',
])<
  { commandId: DevPageDatabase['commandId']; callback: (commandId: DevPageDatabase['commandId']) => void },
  { commandId: DevPageDatabase['commandId'] },
  { commandId: DevPageDatabase['commandId'] }
>();

export const commitPageDraft = createAsyncAction([
  '@PageManager/commitPageDraft/request',
  '@PageManager/commitPageDraft/success',
  '@PageManager/commitPageDraft/failure',
])<
  { item: DevPageDatabase; message: string },
  { commandId: DevPageDatabase['commandId']; newItem: DevPageDatabase },
  { commandId: DevPageDatabase['commandId'] }
>();

export const enableShopifyPageDraft = createAsyncAction([
  '@PageManager/enableShopifyPageDraft/request',
  '@PageManager/enableShopifyPageDraft/success',
  '@PageManager/enableShopifyPageDraft/failure',
])<
  { commandId: DevPageDatabase['commandId']; data: DevPageDatabase; onFulfill: () => void },
  { commandId: DevPageDatabase['commandId'] },
  { commandId: DevPageDatabase['commandId'] }
>();

export const disableShopifyPageDraft = createAsyncAction([
  '@PageManager/disableShopifyPageDraft/request',
  '@PageManager/disableShopifyPageDraft/success',
  '@PageManager/disableShopifyPageDraft/failure',
])<
  { commandId: DevPageDatabase['commandId']; data: DevPageDatabase; onFulfill: () => void },
  { commandId: DevPageDatabase['commandId'] },
  { commandId: DevPageDatabase['commandId'] }
>();

export const useGetPagesDraft = createDispatchAsyncAction(getPagesDraft);
export const useLoadMorePagesDraft = createDispatchAsyncAction(loadMorePagesDraft);
export const useApprovePageDraft = createDispatchAsyncAction(approvePageDraft);
export const useDeletePageDraft = createDispatchAsyncAction(deletePageDraft);
export const useForkPageAtom = createDispatchAsyncAction(forkPageAtom);
export const useRejectPageDraft = createDispatchAsyncAction(rejectPageDraft);
export const useCommitPageDraft = createDispatchAsyncAction(commitPageDraft);
export const useEnableShopifyPageDraft = createDispatchAsyncAction(enableShopifyPageDraft);
export const useDisableShopifyPageDraft = createDispatchAsyncAction(disableShopifyPageDraft);
