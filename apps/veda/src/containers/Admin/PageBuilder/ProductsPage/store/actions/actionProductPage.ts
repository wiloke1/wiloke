import {
  AdminPageData,
  FilterTypePage,
  ServerResponseAdminPage,
  UpdateStatusPageFailure,
  UpdateStatusPageRequest,
  UpdateStatusPageSuccess,
} from 'containers/Admin/types';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from 'services/ShopifyConnection';
import { PageType } from 'types/Page';
import { createAsyncAction } from 'wiloke-react-core/utils';

export const actionCreateProductPage = createAsyncAction([
  '@ProductPage/createPageRequest',
  '@ProductPage/createPageSuccess',
  '@ProductPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; handle: string; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetProductPages = createAsyncAction([
  '@ProductPage/getPagesRequest',
  '@ProductPage/getPagesSuccess',
  '@ProductPage/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteProductPages = createAsyncAction([
  '@ProductPage/deletePagesRequest',
  '@ProductPage/deletePagesSuccess',
  '@ProductPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusProductPage = createAsyncAction([
  '@ProductPage/updateStatusPageRequest',
  '@ProductPage/updateStatusPageSuccess',
  '@ProductPage/updateStatusPageFailure',
])<
  UpdateStatusPageRequest & {
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  UpdateStatusPageSuccess,
  UpdateStatusPageFailure
>();

export const actionLoadMoreProductPage = createAsyncAction([
  '@ProductPage/LoadMoreProductPageRequest',
  '@ProductPage/LoadMoreProductPageSuccess',
  '@ProductPage/LoadMoreProductPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateProductPage = createAsyncAction([
  '@ProductPage/duplicateProductPageRequest',
  '@ProductPage/duplicateProductPageSuccess',
  '@ProductPage/duplicateProductPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentProductItem {
  type: 'setCurrentProductItem';
  payload: {
    item: AdminPageData | undefined;
  };
}

export interface SelectIds {
  type: 'selectIds';
  payload: {
    ids: string[];
  };
}

export interface IsSelectAll {
  type: 'isSelectAll';
  payload: {
    isSelectAll: boolean;
  };
}

export interface FilterPageType {
  type: 'filterPageType';
  payload: {
    pageType: FilterTypePage;
  };
}

export interface ChangeSearchKey {
  type: 'changSearchKey';
  payload: {
    search: string;
  };
}
