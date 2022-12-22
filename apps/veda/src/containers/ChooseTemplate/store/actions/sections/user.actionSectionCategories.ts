import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getTemplateCategories = createAsyncAction([
  '@ChooseTemplate/getTemplateCategories/request',
  '@ChooseTemplate/getTemplateCategories/success',
  '@ChooseTemplate/getTemplateCategories/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, { message: string }>();

export const createProductCategory = createAsyncAction([
  '@ChooseTemplate/createProductCategory/request',
  '@ChooseTemplate/createProductCategory/success',
  '@ChooseTemplate/createProductCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, undefined>();

export const deleteProductCategory = createAsyncAction([
  '@ChooseTemplate/deleteProductCategory/request',
  '@ChooseTemplate/deleteProductCategory/success',
  '@ChooseTemplate/deleteProductCategory/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const updateProductCategory = createAsyncAction([
  '@ChooseTemplate/updateProductCategory/request',
  '@ChooseTemplate/updateProductCategory/success',
  '@ChooseTemplate/updateProductCategory/failure',
])<{ commandId: string; description: string; name: string }, { commandId: string }, { commandId: string }>();

export const useGetTemplateCategories = createDispatchAsyncAction(getTemplateCategories);
export const useCreateProductCategory = createDispatchAsyncAction(createProductCategory);
export const useDeleteProductCategory = createDispatchAsyncAction(deleteProductCategory);
export const useUpdateProductCategory = createDispatchAsyncAction(updateProductCategory);
