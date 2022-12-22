import { ProductSection, SectionCategoryForFrontend } from 'types/Sections';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getSavedSections = createAsyncAction([
  '@ChooseTemplate/getSavedSections/request',
  '@ChooseTemplate/getSavedSections/success',
  '@ChooseTemplate/getSavedSections/failure',
])<{ categories: string[] }, { data: ProductSection[]; hasNextPage: boolean }, { message: string }>();

export const loadMoreSavedSections = createAsyncAction([
  '@ChooseTemplate/loadMoreSavedSections/request',
  '@ChooseTemplate/loadMoreSavedSections/success',
  '@ChooseTemplate/loadMoreSavedSections/failure',
])<{ categories: string[]; cursor: string }, { data: ProductSection[]; hasNextPage: boolean }, undefined>();

export const removeSavedSection = createAsyncAction([
  '@ChooseTemplate/removeSavedSection/request',
  '@ChooseTemplate/removeSavedSection/success',
  '@ChooseTemplate/removeSavedSection/failure',
])<{ id: string }, { id: string }, { id: string }>();

export const installFavoriteSection = createAsyncAction([
  '@ChooseTemplate/installFavoriteSection/request',
  '@ChooseTemplate/installFavoriteSection/success',
  '@ChooseTemplate/installFavoriteSection/failure',
])<{ parentCommandId: string }, { data: ProductSection; parentCommandId: string }, { parentCommandId: string }>();

export const changeMySectionCategory = createAction('@ChooseTemplate/changeMySectionCategory', ({ categorySlug }: { categorySlug: string }) => ({
  categorySlug,
}));

export const setSavedSectionCategories = createAction('@ChooseTemplate/setSavedSectionCategories', (categories: SectionCategoryForFrontend[]) => ({
  categories,
}));

export const useGetSavedSections = createDispatchAsyncAction(getSavedSections);
export const useRemoveSavedSection = createDispatchAsyncAction(removeSavedSection);
export const useInstallFavoriteSection = createDispatchAsyncAction(installFavoriteSection);
export const useChangeMySectionCategory = createDispatchAction(changeMySectionCategory);
export const useLoadMoreSavedSections = createDispatchAsyncAction(loadMoreSavedSections);
