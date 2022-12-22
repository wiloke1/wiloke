import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const createCategoryOfThemeProduct = createAsyncAction([
  '@ThemeManager/createCategoryOfThemeProduct/request',
  '@ThemeManager/createCategoryOfThemeProduct/success',
  '@ThemeManager/createCategoryOfThemeProduct/failure',
])<{ name: string; description: string }, SectionCategoryForFrontend, undefined>();

export const getCategoriesOfThemeProduct = createAsyncAction([
  '@ThemeManager/getCategoriesOfThemeProduct/request',
  '@ThemeManager/getCategoriesOfThemeProduct/success',
  '@ThemeManager/getCategoriesOfThemeProduct/failure',
])<undefined, SectionCategoryForFrontend[], undefined>();

export const useCreateCategoryOfThemeProduct = createDispatchAsyncAction(createCategoryOfThemeProduct);
export const useGetCategoriesOfThemeProduct = createDispatchAsyncAction(getCategoriesOfThemeProduct);
