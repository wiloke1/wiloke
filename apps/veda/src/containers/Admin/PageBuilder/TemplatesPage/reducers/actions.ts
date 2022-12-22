import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { PageType, PreviewImage } from 'types/Page';
import { createAsyncAction } from 'wiloke-react-core/utils';

export interface ChangeTabActive {
  type: 'changeTabActive';
  payload: {
    tabKey: string;
  };
}

export interface ChangePageType {
  type: 'changeSelectPageType';
  payload: PageType;
}

export interface ChangeSearchKeyMyTemplates {
  type: 'changeSearchKeyMyTemplates';
  payload: string;
}

export interface ChangeSearchKeyTemplatePage {
  type: 'changeSearchKeyTemplatePage';
  payload: string;
}

export const getTemplatesPage = createAsyncAction([
  '@PageBuilder/getTemplatesPage/request',
  '@PageBuilder/getTemplatesPage/success',
  '@PageBuilder/getTemplatesPage/failure',
])<
  { pageType: PageType | string; tabKey?: string; limit?: number; label?: string },
  { data: BE_PageProduct[]; hasNextPage: boolean },
  { message: string }
>();

export const loadMorePageTemplate = createAsyncAction([
  '@PageBuilder/loadMorePageTemplate/request',
  '@PageBuilder/loadMorePageTemplate/success',
  '@PageBuilder/loadMorePageTemplate/failure',
])<{ tabKey?: string; pageType: PageType | string; label?: string }, { data: BE_PageProduct[]; hasNextPage: boolean }, { message: string }>();

export const saveToMyTemplate = createAsyncAction([
  '@PageBuilder/saveToMyTemplate/request',
  '@PageBuilder/saveToMyTemplate/success',
  '@PageBuilder/saveToMyTemplate/failure',
])<
  {
    name: string;
    /**  Đây là id của product service.  */
    parentCommandId: string;
    categories: string[];
    image: PreviewImage;
    pageType: PageType;
  },
  { parentCommandId: string },
  { parentCommandId: string }
>();

export const getMyTemplates = createAsyncAction([
  '@PageBuilder/getMyTemplates/request',
  '@PageBuilder/getMyTemplates/success',
  '@PageBuilder/getMyTemplates/failure',
])<{ limit?: number; searchKey?: string }, { data: BE_PageProduct[]; hasNextPage: boolean }, { message: string }>();

export const loadMoreMyTemplates = createAsyncAction([
  '@PageBuilder/loadMoreMyTemplates/request',
  '@PageBuilder/loadMoreMyTemplates/success',
  '@PageBuilder/loadMoreMyTemplates/failure',
])<{ tabKey?: string; searchKey?: string }, { data: BE_PageProduct[]; hasNextPage: boolean }, { message: string }>();

export const deleteTemplatePage = createAsyncAction([
  '@PageBuilder/deleteTemplatePage/request',
  '@PageBuilder/deleteTemplatePage/success',
  '@PageBuilder/deleteTemplatePage/failure',
])<{ commandId: string; pageType: PageType; onFulfill: () => void }, { commandId: string }, { commandId: string }>();

export const deleteFavoritePage = createAsyncAction([
  '@PageBuilder/deleteFavoritePage/request',
  '@PageBuilder/deleteFavoritePage/success',
  '@PageBuilder/deleteFavoritePage/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();
