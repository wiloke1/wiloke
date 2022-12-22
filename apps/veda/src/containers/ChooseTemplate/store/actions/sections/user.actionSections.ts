import { PreviewImage } from 'types/Page';
import { ProductSection } from 'types/Sections';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getSections = createAsyncAction([
  '@ChooseTemplate/getSections/request',
  '@ChooseTemplate/getSections/success',
  '@ChooseTemplate/getSections/failure',
])<{ categoryName: string; sectionIdActive: string; limit: number }, { data: ProductSection[]; hasNextPage: boolean }, { message: string }>();

export const loadMoreSections = createAsyncAction([
  '@ChooseTemplate/loadMoreSections/request',
  '@ChooseTemplate/loadMoreSections/success',
  '@ChooseTemplate/loadMoreSections/failure',
])<{ lastCursor: string }, { data: ProductSection[]; hasNextPage: boolean }, { message: string }>();

export const getSection = createAsyncAction([
  '@ChooseTemplate/getSection/request',
  '@ChooseTemplate/getSection/success',
  '@ChooseTemplate/getSection/failure',
])<
  { sectionId: string; categoryId: string },
  { sectionId: string; data: ProductSection; category: string },
  { message: string; sectionId: string }
>();

export const saveSection = createAsyncAction([
  '@ChooseTemplate/savedSection/request',
  '@ChooseTemplate/savedSection/success',
  '@ChooseTemplate/savedSection/failure',
])<{ id: string; name: string; categories: string[]; image: PreviewImage }, { id: string }, { id: string }>();

export const getMySections = createAsyncAction([
  '@ChooseTemplate/getMySections/request',
  '@ChooseTemplate/getMySections/success',
  '@ChooseTemplate/getMySections/failure',
])<undefined, { data: ProductSection[]; maxPages: number }, { message: string }>();

export const deleteProductSection = createAsyncAction([
  '@ChooseTemplate/deleteProductSection/request',
  '@ChooseTemplate/deleteProductSection/success',
  '@ChooseTemplate/deleteProductSection/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const useGetSections = createDispatchAsyncAction(getSections);
export const useGetSection = createDispatchAsyncAction(getSection);
export const useSaveSection = createDispatchAsyncAction(saveSection);
export const useGetMySections = createDispatchAsyncAction(getMySections);
export const useLoadMoreSections = createDispatchAsyncAction(loadMoreSections);
export const useDeleteProductSection = createDispatchAsyncAction(deleteProductSection);
