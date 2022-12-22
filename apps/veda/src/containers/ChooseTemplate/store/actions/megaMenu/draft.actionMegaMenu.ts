import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { DevSection } from 'types/Sections';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getDraftMegaMenu = createAsyncAction([
  '@ChooseTemplate/getDraftMegaMenu/request',
  '@ChooseTemplate/getDraftMegaMenu/success',
  '@ChooseTemplate/getDraftMegaMenu/failure',
])<undefined, { data: DevSection[]; hasNextPage: boolean }, undefined>();

export const loadMoreDraftMegaMenu = createAsyncAction([
  '@ChooseTemplate/loadMoreDraftMegaMenu/request',
  '@ChooseTemplate/loadMoreDraftMegaMenu/success',
  '@ChooseTemplate/loadMoreDraftMegaMenu/failure',
])<{ cursor: string }, { data: DevSection[]; hasNextPage: boolean }, undefined>();

export const deleteDraftMegaMenu = createAsyncAction([
  '@ChooseTemplate/deleteDraftMegaMenu/request',
  '@ChooseTemplate/deleteDraftMegaMenu/success',
  '@ChooseTemplate/deleteDraftMegaMenu/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const addDraftMegaMenu = createAsyncAction([
  '@ChooseTemplate/addDraftMegaMenu/request',
  '@ChooseTemplate/addDraftMegaMenu/success',
  '@ChooseTemplate/addDraftMegaMenu/failure',
])<{ commandId: string; onFulFill?: (dataResponse: DevSection) => void }, { commandId: string }, { commandId: string }>();

export const getDraftMegaMenuCategory = createAsyncAction([
  '@ChooseTemplate/getDraftMegaMenuCategory/request',
  '@ChooseTemplate/getDraftMegaMenuCategory/success',
  '@ChooseTemplate/getDraftMegaMenuCategory/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, undefined>();

export const createDraftMegaMenuCategory = createAsyncAction([
  '@ChooseTemplate/createDraftMegaMenuCategory/request',
  '@ChooseTemplate/createDraftMegaMenuCategory/success',
  '@ChooseTemplate/createDraftMegaMenuCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, undefined>();

export const approveMegaMenuToAdmin = createAsyncAction([
  '@ChooseTemplate/approveMegaMenuToAdmin/request',
  '@ChooseTemplate/approveMegaMenuToAdmin/success',
  '@ChooseTemplate/approveMegaMenuToAdmin/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const forkMegaMenuAdminToDraft = createAsyncAction([
  '@ChooseTemplate/forkMegaMenuAdminToDraft/request',
  '@ChooseTemplate/forkMegaMenuAdminToDraft/success',
  '@ChooseTemplate/forkMegaMenuAdminToDraft/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const rejectDraftMegaMenu = createAsyncAction([
  '@ChooseTemplate/rejectDraftMegaMenu/request',
  '@ChooseTemplate/rejectDraftMegaMenu/success',
  '@ChooseTemplate/rejectDraftMegaMenu/failure',
])<{ section: DevSection }, { commandId: string }, { commandId: string }>();

export const useGetDraftMegaMenu = createDispatchAsyncAction(getDraftMegaMenu);
export const useDeleteDraftMegaMenu = createDispatchAsyncAction(deleteDraftMegaMenu);
export const useLoadMoreDraftMegaMenu = createDispatchAsyncAction(loadMoreDraftMegaMenu);
export const useAddDraftMegaMenu = createDispatchAsyncAction(addDraftMegaMenu);
export const useGetDraftMegaMenuCategory = createDispatchAsyncAction(getDraftMegaMenuCategory);
export const useApproveMegaMenuToAdmin = createDispatchAsyncAction(approveMegaMenuToAdmin);
export const useCreateDraftMegaMenuCategory = createDispatchAsyncAction(createDraftMegaMenuCategory);
export const useForkMegaMenuAdminToDraft = createDispatchAsyncAction(forkMegaMenuAdminToDraft);
export const useRejectDraftMegaMenu = createDispatchAsyncAction(rejectDraftMegaMenu);
