import { AdminSection, ProductSection, SectionChangelog } from 'types/Sections';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAdminSections = createAsyncAction([
  '@ChooseTemplate/getAdminSections/request',
  '@ChooseTemplate/getAdminSections/success',
  '@ChooseTemplate/getAdminSections/failure',
])<{ categoryCommandId?: string; categoryName?: string; label?: string }, { data: AdminSection[]; hasNextPage: boolean }, undefined>();

export const loadMoreAdminSections = createAsyncAction([
  '@ChooseTemplate/loadMoreAdminSections/request',
  '@ChooseTemplate/loadMoreAdminSections/success',
  '@ChooseTemplate/loadMoreAdminSections/failure',
])<
  { cursor: string; categoryCommandId?: string; categoryName?: string; label?: string },
  { data: AdminSection[]; hasNextPage: boolean },
  undefined
>();

export const deleteAdminSection = createAsyncAction([
  '@ChooseTemplate/deleteAdminSection/request',
  '@ChooseTemplate/deleteAdminSection/success',
  '@ChooseTemplate/deleteAdminSection/failure',
])<{ section: AdminSection }, { commandId: string }, { commandId: string }>();

export const setSettingsAdminSection = createAction(
  '@ChooseTemplate/setSettingsAdminSection',
  ({ visible, sectionId }: { visible: boolean; sectionId: string }) => ({ visible, sectionId }),
);

export const publishAdminSectionToProduct = createAsyncAction([
  '@ChooseTemplate/publishAdminSectionToProduct/request',
  '@ChooseTemplate/publishAdminSectionToProduct/success',
  '@ChooseTemplate/publishAdminSectionToProduct/failure',
])<{ section: ProductSection }, undefined, undefined>();

export const getAdminSectionChangelog = createAsyncAction([
  '@ChooseTemplate/getAdminSectionChangelog/request',
  '@ChooseTemplate/getAdminSectionChangelog/success',
  '@ChooseTemplate/getAdminSectionChangelog/failure',
])<{ commandId: string }, SectionChangelog[], undefined>();

export const createAdminSectionChangelog = createAsyncAction([
  '@ChooseTemplate/createAdminSectionChangelog/request',
  '@ChooseTemplate/createAdminSectionChangelog/success',
  '@ChooseTemplate/createAdminSectionChangelog/failure',
])<Omit<SectionChangelog, 'commandId'>, SectionChangelog, undefined>();

export const rejectAdminSection = createAsyncAction([
  '@ChooseTemplate/rejectAdminSection/request',
  '@ChooseTemplate/rejectAdminSection/success',
  '@ChooseTemplate/rejectAdminSection/failure',
])<{ commandId: string; comment?: string; assignTo?: number }, { commandId: string }, { commandId: string }>();

export const installAdminSection = createAsyncAction([
  '@ChooseTemplate/installAdminSection/request',
  '@ChooseTemplate/installAdminSection/success',
  '@ChooseTemplate/installAdminSection/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const setSearchKeySectionAtom = createAction('@ChooseTemplate/setSearchKeySectionAtom', (searchKey: string) => ({
  searchKey,
}));

export const setCurrentAdminSection = createAction('@ChooseTemplate/setCurrentAdminSection', (section: AdminSection | undefined) => ({
  section,
}));

export const useGetAdminSections = createDispatchAsyncAction(getAdminSections);
export const useLoadMoreAdminSections = createDispatchAsyncAction(loadMoreAdminSections);
export const usedDeleteAdminSection = createDispatchAsyncAction(deleteAdminSection);
export const usePublishAdminSectionToProduct = createDispatchAsyncAction(publishAdminSectionToProduct);
export const useSetSettingsAdminSection = createDispatchAction(setSettingsAdminSection);
export const useGetAdminSectionChangelog = createDispatchAsyncAction(getAdminSectionChangelog);
export const useCreateAdminSectionChangelog = createDispatchAsyncAction(createAdminSectionChangelog);
export const useRejectAdminSection = createDispatchAsyncAction(rejectAdminSection);
export const useInstallAdminSection = createDispatchAsyncAction(installAdminSection);
export const useSetSearchKeySectionAtom = createDispatchAction(setSearchKeySectionAtom);
export const useSetCurrentAdminSection = createDispatchAction(setCurrentAdminSection);
