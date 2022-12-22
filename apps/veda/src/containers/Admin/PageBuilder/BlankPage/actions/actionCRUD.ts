import {
  AdminPageData,
  FilterTypePage,
  ServerResponseAdminPage,
  UpdateStatusPageFailure,
  UpdateStatusPageRequest,
  UpdateStatusPageSuccess,
} from 'containers/Admin/types';
import { PageType } from 'types/Page';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionCreateBlankPage = createAsyncAction([
  '@BlankPage/createPageRequest',
  '@BlankPage/createPageSuccess',
  '@BlankPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetBlankPages = createAsyncAction(['@BlankPage/getPagesRequest', '@BlankPage/getPagesSuccess', '@BlankPage/getPagesFailure'])<
  { s?: string; pageType: PageType; filterType: FilterTypePage },
  { data: ServerResponseAdminPage['info'] },
  undefined
>();

export const actionDeleteBlankPages = createAsyncAction([
  '@BlankPage/deletePagesRequest',
  '@BlankPage/deletePagesSuccess',
  '@BlankPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusBlankPage = createAsyncAction([
  '@BlankPage/updateStatusPageRequest',
  '@BlankPage/updateStatusPageSuccess',
  '@BlankPage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreBlankPage = createAsyncAction([
  '@BlankPage/LoadMoreBlankPageRequest',
  '@BlankPage/LoadMoreBlankPageSuccess',
  '@BlankPage/LoadMoreBlankPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateBlankPage = createAsyncAction([
  '@BlankPage/duplicateBlankPageRequest',
  '@BlankPage/duplicateBlankPageSuccess',
  '@BlankPage/duplicateBlankPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export const setCurrentBlankItem = createAction('@BlankPage/setCurrentBlankItem', (item: AdminPageData | undefined) => ({ item }));

export const useDuplicateBlankPage = createDispatchAsyncAction(actionDuplicateBlankPage);
export const useCurrentBlankItem = createDispatchAction(setCurrentBlankItem);
export const useLoadMoreBlankPage = createDispatchAsyncAction(actionLoadMoreBlankPage);
export const useUpdateStatusBlankPage = createDispatchAsyncAction(actionUpdateStatusBlankPage);
export const useDeleteBlankPages = createDispatchAsyncAction(actionDeleteBlankPages);
export const useGetBlankPageItems = createDispatchAsyncAction(actionGetBlankPages);
export const useCreateBlankPage = createDispatchAsyncAction(actionCreateBlankPage);
