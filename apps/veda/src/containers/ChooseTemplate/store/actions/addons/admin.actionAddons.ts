import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { AdminAddon, ProductAddon } from 'types/Addons';
import { SectionChangelog } from 'types/Sections';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAdminAddons = createAsyncAction([
  '@ChooseTemplate/getAdminAddons/request',
  '@ChooseTemplate/getAdminAddons/success',
  '@ChooseTemplate/getAdminAddons/failure',
])<{ categoryName: string }, { data: AdminAddon[]; hasNextPage: boolean }, undefined>();

export const loadMoreAdminAddons = createAsyncAction([
  '@ChooseTemplate/loadMoreAdminAddons/request',
  '@ChooseTemplate/loadMoreAdminAddons/success',
  '@ChooseTemplate/loadMoreAdminAddons/failure',
])<{ cursor: string }, { data: AdminAddon[]; hasNextPage: boolean }, undefined>();

export const deleteAdminAddons = createAsyncAction([
  '@ChooseTemplate/deleteAdminAddons/request',
  '@ChooseTemplate/deleteAdminAddons/success',
  '@ChooseTemplate/deleteAdminAddons/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const getAdminAddonsCategory = createAsyncAction([
  '@ChooseTemplate/getAdminAddonsCategory/request',
  '@ChooseTemplate/getAdminAddonsCategory/success',
  '@ChooseTemplate/getAdminAddonsCategory/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, undefined>();

export const createAdminAddonsCategory = createAsyncAction([
  '@ChooseTemplate/createAdminAddonsCategory/request',
  '@ChooseTemplate/createAdminAddonsCategory/success',
  '@ChooseTemplate/createAdminAddonsCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, undefined>();

export const publishAdminAddonsToProduct = createAsyncAction([
  '@ChooseTemplate/publishAdminAddonsToProduct/request',
  '@ChooseTemplate/publishAdminAddonsToProduct/success',
  '@ChooseTemplate/publishAdminAddonsToProduct/failure',
])<{ addon: ProductAddon }, undefined, undefined>();

export const createAdminAddonChangelog = createAsyncAction([
  '@ChooseTemplate/createAdminAddonChangelog/request',
  '@ChooseTemplate/createAdminAddonChangelog/success',
  '@ChooseTemplate/createAdminAddonChangelog/failure',
])<Omit<SectionChangelog, 'commandId'>, SectionChangelog, undefined>();

export const rejectAdminAddon = createAsyncAction([
  '@ChooseTemplate/rejectAdminAddon/request',
  '@ChooseTemplate/rejectAdminAddon/success',
  '@ChooseTemplate/rejectAdminAddon/failure',
])<{ commandId: string; comment?: string; assignTo?: number }, { commandId: string }, { commandId: string }>();

export const installAdminAddon = createAsyncAction([
  '@ChooseTemplate/installAdminAddon/request',
  '@ChooseTemplate/installAdminAddon/success',
  '@ChooseTemplate/installAdminAddon/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const useGetAdminAddons = createDispatchAsyncAction(getAdminAddons);
export const useDeleteAdminAddons = createDispatchAsyncAction(deleteAdminAddons);
export const useLoadMoreAdminAddons = createDispatchAsyncAction(loadMoreAdminAddons);
export const useGetAdminAddonsCategory = createDispatchAsyncAction(getAdminAddonsCategory);
export const useCreateAdminAddonCategory = createDispatchAsyncAction(createAdminAddonsCategory);
export const usePublishAdminAddonsToProduct = createDispatchAsyncAction(publishAdminAddonsToProduct);
export const useCreateAdminAddonChangelog = createDispatchAsyncAction(createAdminAddonChangelog);
export const useRejectAdminAddon = createDispatchAsyncAction(rejectAdminAddon);
export const useInstallAdminAddon = createDispatchAsyncAction(installAdminAddon);
