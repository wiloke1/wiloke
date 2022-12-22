import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ProductAddon } from 'types/Addons';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAddonsTemplate = createAsyncAction([
  '@ChooseTemplate/getAddonsTemplate/request',
  '@ChooseTemplate/getAddonsTemplate/success',
  '@ChooseTemplate/getAddonsTemplate/failure',
])<{ categoryName: string; limit: number }, { data: ProductAddon[]; hasNextPage: boolean }, undefined>();

export const loadMoreAddonsTemplate = createAsyncAction([
  '@ChooseTemplate/loadMoreAddonsTemplate/request',
  '@ChooseTemplate/loadMoreAddonsTemplate/success',
  '@ChooseTemplate/loadMoreAddonsTemplate/failure',
])<{ cursor: string }, { data: ProductAddon[]; hasNextPage: boolean }, undefined>();

export const getAddonsNav = createAsyncAction([
  '@ChooseTemplate/getAddonsNav/request',
  '@ChooseTemplate/getAddonsNav/success',
  '@ChooseTemplate/getAddonsNav/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, undefined>();

export const createUserAddonsCategory = createAsyncAction([
  '@ChooseTemplate/createUserAddonsCategory/request',
  '@ChooseTemplate/createUserAddonsCategory/success',
  '@ChooseTemplate/createUserAddonsCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, undefined>();

export const addAddons = createAsyncAction([
  '@ChooseTemplate/addAddons/request',
  '@ChooseTemplate/addAddons/success',
  '@ChooseTemplate/addAddons/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const deleteProductAddons = createAsyncAction([
  '@ChooseTemplate/deleteAddons/request',
  '@ChooseTemplate/deleteAddons/success',
  '@ChooseTemplate/deleteAddons/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const useGetAddonsTemplate = createDispatchAsyncAction(getAddonsTemplate);
export const useGetAddonsNav = createDispatchAsyncAction(getAddonsNav);
export const useAddAddons = createDispatchAsyncAction(addAddons);
export const useDeleteProductAddons = createDispatchAsyncAction(deleteProductAddons);
export const useLoadMoreAddonsTemplate = createDispatchAsyncAction(loadMoreAddonsTemplate);
export const useCreateUserAddonsCategory = createDispatchAsyncAction(createUserAddonsCategory);
