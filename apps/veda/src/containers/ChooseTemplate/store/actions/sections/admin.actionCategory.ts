import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAdminCategories = createAsyncAction([
  '@ChooseTemplate/getAdminCategories/request',
  '@ChooseTemplate/getAdminCategories/success',
  '@ChooseTemplate/getAdminCategories/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, { message: string }>();

export const addAdminCategory = createAsyncAction([
  '@ChooseTemplate/addAdminCategory/request',
  '@ChooseTemplate/addAdminCategory/success',
  '@ChooseTemplate/addAdminCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, { message: string }>();

export const deleteAdminCategory = createAsyncAction([
  '@ChooseTemplate/deleteAdminCategory/request',
  '@ChooseTemplate/deleteAdminCategory/success',
  '@ChooseTemplate/deleteAdminCategory/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const updateAdminCategory = createAsyncAction([
  '@ChooseTemplate/updateAdminCategory/request',
  '@ChooseTemplate/updateAdminCategory/success',
  '@ChooseTemplate/updateAdminCategory/failure',
])<{ commandId: string; description: string; name: string }, { commandId: string }, { commandId: string }>();

export const useGetAdminCategories = createDispatchAsyncAction(getAdminCategories);
export const useAddAdminCategory = createDispatchAsyncAction(addAdminCategory);
export const useDeleteAdminCategory = createDispatchAsyncAction(deleteAdminCategory);
export const useUpdateAdminCategory = createDispatchAsyncAction(updateAdminCategory);
