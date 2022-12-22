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

export const actionCreateArticlePage = createAsyncAction([
  '@ArticlePage/createPageRequest',
  '@ArticlePage/createPageSuccess',
  '@ArticlePage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; handle: string; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetArticlePages = createAsyncAction([
  '@ArticlePage/getPagesRequest',
  '@ArticlePage/getPagesSuccess',
  '@ArticlePage/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteArticlePages = createAsyncAction([
  '@ArticlePage/deletePagesRequest',
  '@ArticlePage/deletePagesSuccess',
  '@ArticlePage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusArticlePage = createAsyncAction([
  '@ArticlePage/updateStatusPageRequest',
  '@ArticlePage/updateStatusPageSuccess',
  '@ArticlePage/updateStatusPageFailure',
])<
  UpdateStatusPageRequest & {
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  UpdateStatusPageSuccess,
  UpdateStatusPageFailure
>();

export const actionLoadMoreArticlePage = createAsyncAction([
  '@ArticlePage/LoadMoreArticlePageRequest',
  '@ArticlePage/LoadMoreArticlePageSuccess',
  '@ArticlePage/LoadMoreArticlePageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateArticlePage = createAsyncAction([
  '@ArticlePage/duplicateArticlePageRequest',
  '@ArticlePage/duplicateArticlePageSuccess',
  '@ArticlePage/duplicateArticlePageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentArticleItem {
  type: 'setCurrentArticleItem';
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
