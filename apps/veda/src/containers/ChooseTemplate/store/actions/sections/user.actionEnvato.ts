import { SectionEnvatoCategory } from 'types/Sections';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getEnvatoCategories = createAsyncAction([
  '@ChooseTemplate/getEnvatoCategories/request',
  '@ChooseTemplate/getEnvatoCategories/success',
  '@ChooseTemplate/getEnvatoCategories/failure',
])<undefined, { data: SectionEnvatoCategory[] }, undefined>();

export const createEnvatoCategory = createAsyncAction([
  '@ChooseTemplate/createEnvatoCategory/request',
  '@ChooseTemplate/createEnvatoCategory/success',
  '@ChooseTemplate/createEnvatoCategory/failure',
])<{ description: string; name: string; envatoItemId: string }, SectionEnvatoCategory, undefined>();

export const useGetEnvatoCategories = createDispatchAsyncAction(getEnvatoCategories);
export const useCreateEnvatoCategory = createDispatchAsyncAction(createEnvatoCategory);
