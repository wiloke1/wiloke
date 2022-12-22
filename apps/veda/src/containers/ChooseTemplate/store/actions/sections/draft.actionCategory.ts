import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getDraftCategories = createAsyncAction([
  '@ChooseTemplate/getDraftCategories/request',
  '@ChooseTemplate/getDraftCategories/success',
  '@ChooseTemplate/getDraftCategories/failure',
])<undefined, { data: SectionCategoryForFrontend[] }, { message: string }>();

export const addDraftCategory = createAsyncAction([
  '@ChooseTemplate/addDraftCategory/request',
  '@ChooseTemplate/addDraftCategory/success',
  '@ChooseTemplate/addDraftCategory/failure',
])<{ description: string; name: string }, SectionCategoryForFrontend, { message: string }>();

export const useGetDraftCategories = createDispatchAsyncAction(getDraftCategories);
export const useAddDraftCategory = createDispatchAsyncAction(addDraftCategory);
