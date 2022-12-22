import { AdminSection, ProductSection, SectionChangelog } from 'types/Sections';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAdminMegaMenu = createAsyncAction([
  '@ChooseTemplate/getAdminMegaMenu/request',
  '@ChooseTemplate/getAdminMegaMenu/success',
  '@ChooseTemplate/getAdminMegaMenu/failure',
])<undefined, { data: AdminSection[]; hasNextPage: boolean }, undefined>();

export const loadMoreAdminMegaMenu = createAsyncAction([
  '@ChooseTemplate/loadMoreAdminMegaMenu/request',
  '@ChooseTemplate/loadMoreAdminMegaMenu/success',
  '@ChooseTemplate/loadMoreAdminMegaMenu/failure',
])<{ cursor: string }, { data: AdminSection[]; hasNextPage: boolean }, undefined>();

export const deleteAdminMegaMenu = createAsyncAction([
  '@ChooseTemplate/deleteAdminMegaMenu/request',
  '@ChooseTemplate/deleteAdminMegaMenu/success',
  '@ChooseTemplate/deleteAdminMegaMenu/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const setSettingsAdminMegaMenu = createAction(
  '@ChooseTemplate/setSettingsAdminMegaMenu',
  ({ visible, megaMenuId }: { visible: boolean; megaMenuId: string }) => ({ visible, megaMenuId }),
);

export const publishAdminMegaMenuToProduct = createAsyncAction([
  '@ChooseTemplate/publishAdminMegaMenuToProduct/request',
  '@ChooseTemplate/publishAdminMegaMenuToProduct/success',
  '@ChooseTemplate/publishAdminMegaMenuToProduct/failure',
])<{ productMegaMenu: ProductSection }, undefined, undefined>();

export const getAdminMegaMenuChangelog = createAsyncAction([
  '@ChooseTemplate/getAdminMegaMenuChangelog/request',
  '@ChooseTemplate/getAdminMegaMenuChangelog/success',
  '@ChooseTemplate/getAdminMegaMenuChangelog/failure',
])<{ commandId: string }, SectionChangelog, undefined>();

export const createAdminMegaMenuChangelog = createAsyncAction([
  '@ChooseTemplate/createAdminMegaMenuChangelog/request',
  '@ChooseTemplate/createAdminMegaMenuChangelog/success',
  '@ChooseTemplate/createAdminMegaMenuChangelog/failure',
])<Omit<SectionChangelog, 'commandId'>, SectionChangelog, undefined>();

export const rejectAdminMegaMenu = createAsyncAction([
  '@ChooseTemplate/rejectAdminMegaMenu/request',
  '@ChooseTemplate/rejectAdminMegaMenu/success',
  '@ChooseTemplate/rejectAdminMegaMenu/failure',
])<{ commandId: string; comment?: string; assignTo?: number }, { commandId: string }, { commandId: string }>();

export const addAdminMegaMenu = createAsyncAction([
  '@ChooseTemplate/addAdminMegaMenu/request',
  '@ChooseTemplate/addAdminMegaMenu/success',
  '@ChooseTemplate/addAdminMegaMenu/failure',
])<{ commandId: string; onFulFill?: (dataResponse: AdminSection) => void }, { commandId: string }, { commandId: string }>();

export const useGetAdminMegaMenu = createDispatchAsyncAction(getAdminMegaMenu);
export const useLoadMoreAdminMegaMenu = createDispatchAsyncAction(loadMoreAdminMegaMenu);
export const usedDeleteAdminMegaMenu = createDispatchAsyncAction(deleteAdminMegaMenu);
export const usePublishAdminMegaMenuToProduct = createDispatchAsyncAction(publishAdminMegaMenuToProduct);
export const useSetSettingsAdminMegaMenu = createDispatchAction(setSettingsAdminMegaMenu);
export const useGetAdminMegaMenuChangelog = createDispatchAsyncAction(getAdminMegaMenuChangelog);
export const useCreateAdminMegaMenuChangelog = createDispatchAsyncAction(createAdminMegaMenuChangelog);
export const useRejectAdminMegaMenu = createDispatchAsyncAction(rejectAdminMegaMenu);
export const useAddAdminMegaMenu = createDispatchAsyncAction(addAdminMegaMenu);
