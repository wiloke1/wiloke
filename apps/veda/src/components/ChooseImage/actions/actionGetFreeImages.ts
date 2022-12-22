import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { FreeImageCategoriesData, FreeImages } from '../types/FreeImage';

export const getFreeImages = createAsyncAction([
  '@MyMedia/getFreeImages/request',
  '@MyMedia/getFreeImages/success',
  '@MyMedia/getFreeImages/failure',
])<{ search?: string; category?: string }, { data: FreeImages[]; hasNextPage: boolean }, undefined>();

export const loadMoreFreeImages = createAsyncAction([
  '@MyMedia/loadMoreFreeImages/request',
  '@MyMedia/loadMoreFreeImages/success',
  '@MyMedia/loadMoreFreeImages/failure',
])<{ search?: string; category?: string }, { data: FreeImages[]; hasNextPage: boolean }, undefined>();

export const getCategoriesOfFreeImages = createAsyncAction([
  '@MyMedia/getCategoriesOfFreeImages/request',
  '@MyMedia/getCategoriesOfFreeImages/success',
  '@MyMedia/getCategoriesOfFreeImages/failure',
])<undefined, { data: FreeImageCategoriesData[] }, undefined>();

export const useGetFreeImages = createDispatchAsyncAction(getFreeImages);
export const useGetCategoriesOfFreeImages = createDispatchAsyncAction(getCategoriesOfFreeImages);
export const useLoadMoreFreeImages = createDispatchAsyncAction(loadMoreFreeImages);
