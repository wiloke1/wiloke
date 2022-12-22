import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const createCategoryOfPageProduct = createAsyncAction([
  '@PageManager/createCategoryOfPageProduct/request',
  '@PageManager/createCategoryOfPageProduct/success',
  '@PageManager/createCategoryOfPageProduct/failure',
])<{ name: string; description: string }, SectionCategoryForFrontend, undefined>();

export const getCategoriesOfPageProduct = createAsyncAction([
  '@PageManager/getCategoriesOfPageProduct/request',
  '@PageManager/getCategoriesOfPageProduct/success',
  '@PageManager/getCategoriesOfPageProduct/failure',
])<undefined, SectionCategoryForFrontend[], undefined>();

export const useCreateCategoryOfPageProduct = createDispatchAsyncAction(createCategoryOfPageProduct);
export const useGetCategoriesOfPageProduct = createDispatchAsyncAction(getCategoriesOfPageProduct);
