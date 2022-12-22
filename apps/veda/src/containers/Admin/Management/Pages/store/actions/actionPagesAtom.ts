import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { SectionCategoryForFrontend } from 'types/Sections';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getPagesAtom = createAsyncAction([
  '@PageManager/getPagesAtom/request',
  '@PageManager/getPagesAtom/success',
  '@PageManager/getPagesAtom/failure',
])<undefined, { hasNextPage: boolean; data: AdminPageDatabase[] }, undefined>();

export const loadMorePagesAtom = createAsyncAction([
  '@PageManager/loadMorePagesAtom/request',
  '@PageManager/loadMorePagesAtom/success',
  '@PageManager/loadMorePagesAtom/failure',
])<{ cursor: string }, { hasNextPage: boolean; data: AdminPageDatabase[] }, undefined>();

export const deletePageAtom = createAsyncAction([
  '@PageManager/deletePageAtom/request',
  '@PageManager/deletePageAtom/success',
  '@PageManager/deletePageAtom/failure',
])<
  {
    onlyShopify: boolean;
    commandId: AdminPageDatabase['commandId'];
    name: AdminPageDatabase['label'];
    type: AdminPageDatabase['type'];
    onFulfill: () => void;
  },
  { onlyShopify: boolean; commandId: AdminPageDatabase['commandId'] },
  { commandId: AdminPageDatabase['commandId'] }
>();

export const publishPageAtom = createAsyncAction([
  '@PageManager/publishPageAtom/request',
  '@PageManager/publishPageAtom/success',
  '@PageManager/publishPageAtom/failure',
])<{ pageAtom: AdminPageDatabase; categoryOfProduct: undefined | SectionCategoryForFrontend }, undefined, undefined>();

export const hotfixPageAtom = createAsyncAction([
  '@PageManager/hotfixPageAtom/request',
  '@PageManager/hotfixPageAtom/success',
  '@PageManager/hotfixPageAtom/failure',
])<
  { commandId: AdminPageDatabase['commandId']; assignToUserId: AdminPageDatabase['userId']; message: string },
  { commandId: AdminPageDatabase['commandId'] },
  { commandId: AdminPageDatabase['commandId'] }
>();

export const enableShopifyPageAtom = createAsyncAction([
  '@PageManager/enableShopifyPageAtom/request',
  '@PageManager/enableShopifyPageAtom/success',
  '@PageManager/enableShopifyPageAtom/failure',
])<
  { commandId: AdminPageDatabase['commandId']; data: AdminPageDatabase; onFulfill: () => void },
  { commandId: AdminPageDatabase['commandId'] },
  { commandId: AdminPageDatabase['commandId'] }
>();

export const disableShopifyPageAtom = createAsyncAction([
  '@PageManager/disableShopifyPageAtom/request',
  '@PageManager/disableShopifyPageAtom/success',
  '@PageManager/disableShopifyPageAtom/failure',
])<
  { commandId: AdminPageDatabase['commandId']; data: AdminPageDatabase; onFulfill: () => void },
  { commandId: AdminPageDatabase['commandId'] },
  { commandId: AdminPageDatabase['commandId'] }
>();

export const useGetPagesAtom = createDispatchAsyncAction(getPagesAtom);
export const useLoadMorePagesAtom = createDispatchAsyncAction(loadMorePagesAtom);
export const useDeletePageAtom = createDispatchAsyncAction(deletePageAtom);
export const usePublishPageAtom = createDispatchAsyncAction(publishPageAtom);
export const useHotfixPageAtom = createDispatchAsyncAction(hotfixPageAtom);
export const useEnableShopifyPageAtom = createDispatchAsyncAction(enableShopifyPageAtom);
export const useDisableShopifyPageAtom = createDispatchAsyncAction(disableShopifyPageAtom);
