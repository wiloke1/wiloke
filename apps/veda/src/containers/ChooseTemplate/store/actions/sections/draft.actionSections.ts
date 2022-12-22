import { DevSection } from 'types/Sections';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getDraftSections = createAsyncAction([
  '@ChooseTemplate/getDraftSections/request',
  '@ChooseTemplate/getDraftSections/success',
  '@ChooseTemplate/getDraftSections/failure',
])<{ categoryName?: string; label?: string }, { data: DevSection[]; hasNextPage: boolean }, undefined>();

export const loadMoreDraftSections = createAsyncAction([
  '@ChooseTemplate/loadMoreDraftSections/request',
  '@ChooseTemplate/loadMoreDraftSections/success',
  '@ChooseTemplate/loadMoreDraftSections/failure',
])<{ cursor: string; categoryName?: string; label?: string }, { data: DevSection[]; hasNextPage: boolean }, undefined>();

export const deleteDraftSection = createAsyncAction([
  '@ChooseTemplate/deleteDraftSection/request',
  '@ChooseTemplate/deleteDraftSection/success',
  '@ChooseTemplate/deleteDraftSection/failure',
])<{ section: DevSection }, { commandId: string }, { commandId: string }>();

export const approveSectionToAdmin = createAsyncAction([
  '@ChooseTemplate/approveSectionToAdmin/request',
  '@ChooseTemplate/approveSectionToAdmin/success',
  '@ChooseTemplate/approveSectionToAdmin/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const forkSectionAdminToDraft = createAsyncAction([
  '@ChooseTemplate/forkSectionAdminToDraft/request',
  '@ChooseTemplate/forkSectionAdminToDraft/success',
  '@ChooseTemplate/forkSectionAdminToDraft/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const rejectDraftSection = createAsyncAction([
  '@ChooseTemplate/rejectDraftSection/request',
  '@ChooseTemplate/rejectDraftSection/success',
  '@ChooseTemplate/rejectDraftSection/failure',
])<{ section: DevSection }, { commandId: string }, { commandId: string }>();

export const installDraftSection = createAsyncAction([
  '@ChooseTemplate/installDraftSection/request',
  '@ChooseTemplate/installDraftSection/success',
  '@ChooseTemplate/installDraftSection/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const setSearchKeyDraftSection = createAction('@ChooseTemplate/setSearchKeyDraftSection', (searchKey: string) => ({
  searchKey,
}));

export const useGetDraftSections = createDispatchAsyncAction(getDraftSections);
export const useLoadMoreDraftSections = createDispatchAsyncAction(loadMoreDraftSections);
export const usedDeleteDraftSection = createDispatchAsyncAction(deleteDraftSection);
export const useApproveSectionToAdmin = createDispatchAsyncAction(approveSectionToAdmin);
export const useForkSectionAdminToDraft = createDispatchAsyncAction(forkSectionAdminToDraft);
export const useRejectDraftSection = createDispatchAsyncAction(rejectDraftSection);
export const useInstallDraftSection = createDispatchAsyncAction(installDraftSection);
export const useSetSearchKeyDraftSection = createDispatchAction(setSearchKeyDraftSection);
