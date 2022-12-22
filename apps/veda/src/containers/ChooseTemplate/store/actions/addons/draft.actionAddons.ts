import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { DevAddon } from 'types/Addons';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getDraftAddons = createAsyncAction([
  '@ChooseTemplate/getDraftAddons/request',
  '@ChooseTemplate/getDraftAddons/success',
  '@ChooseTemplate/getDraftAddons/failure',
])<{ categoryName: string }, { data: DevAddon[]; hasNextPage: boolean }, undefined>();

export const loadMoreDraftAddons = createAsyncAction([
  '@ChooseTemplate/loadMoreDraftAddons/request',
  '@ChooseTemplate/loadMoreDraftAddons/success',
  '@ChooseTemplate/loadMoreDraftAddons/failure',
])<{ cursor: string }, { data: DevAddon[]; hasNextPage: boolean }, undefined>();

export const deleteDraftAddons = createAsyncAction([
  '@ChooseTemplate/deleteDraftAddons/request',
  '@ChooseTemplate/deleteDraftAddons/success',
  '@ChooseTemplate/deleteDraftAddons/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const addDraftAddon = createAsyncAction([
  '@ChooseTemplate/addDraftAddons/request',
  '@ChooseTemplate/addDraftAddons/success',
  '@ChooseTemplate/addDraftAddons/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const getDraftAddonsCategory = createAsyncAction([
  '@ChooseTemplate/getDraftAddonsCategory/request',
  '@ChooseTemplate/getDraftAddonsCategory/success',
  '@ChooseTemplate/getDraftAddonsCategory/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, undefined>();

export const createDraftAddonsCategory = createAsyncAction([
  '@ChooseTemplate/createDraftAddonsCategory/request',
  '@ChooseTemplate/createDraftAddonsCategory/success',
  '@ChooseTemplate/createDraftAddonsCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, undefined>();

export const approveAddonToAdmin = createAsyncAction([
  '@ChooseTemplate/approveAddonToAdmin/request',
  '@ChooseTemplate/approveAddonToAdmin/success',
  '@ChooseTemplate/approveAddonToAdmin/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const forkAddonAdminToDraft = createAsyncAction([
  '@ChooseTemplate/forkAddonAdminToDraft/request',
  '@ChooseTemplate/forkAddonAdminToDraft/success',
  '@ChooseTemplate/forkAddonAdminToDraft/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const rejectDraftAddon = createAsyncAction([
  '@ChooseTemplate/rejectDraftAddon/request',
  '@ChooseTemplate/rejectDraftAddon/success',
  '@ChooseTemplate/rejectDraftAddon/failure',
])<{ devAddon: DevAddon }, { commandId: string }, { commandId: string }>();

export const useGetDraftAddons = createDispatchAsyncAction(getDraftAddons);
export const useDeleteDraftAddons = createDispatchAsyncAction(deleteDraftAddons);
export const useLoadMoreDraftAddons = createDispatchAsyncAction(loadMoreDraftAddons);
export const useAddDraftAddon = createDispatchAsyncAction(addDraftAddon);
export const useGetDraftAddonsCategory = createDispatchAsyncAction(getDraftAddonsCategory);
export const useApproveAddonToAdmin = createDispatchAsyncAction(approveAddonToAdmin);
export const useCreateDraftAddonCategory = createDispatchAsyncAction(createDraftAddonsCategory);
export const useForkAddonAdminToDraft = createDispatchAsyncAction(forkAddonAdminToDraft);
export const useRejectDraftAddon = createDispatchAsyncAction(rejectDraftAddon);
