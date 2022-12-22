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

export const actionCreateCollectionPage = createAsyncAction([
  '@CollectionPage/createPageRequest',
  '@CollectionPage/createPageSuccess',
  '@CollectionPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; handle: string; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCollectionPages = createAsyncAction([
  '@CollectionPage/getPagesRequest',
  '@CollectionPage/getPagesSuccess',
  '@CollectionPage/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCollectionPages = createAsyncAction([
  '@CollectionPage/deletePagesRequest',
  '@CollectionPage/deletePagesSuccess',
  '@CollectionPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCollectionPage = createAsyncAction([
  '@CollectionPage/updateStatusPageRequest',
  '@CollectionPage/updateStatusPageSuccess',
  '@CollectionPage/updateStatusPageFailure',
])<
  UpdateStatusPageRequest & {
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  UpdateStatusPageSuccess,
  UpdateStatusPageFailure
>();

export const actionLoadMoreCollectionPage = createAsyncAction([
  '@CollectionPage/LoadMoreCollectionPageRequest',
  '@CollectionPage/LoadMoreCollectionPageSuccess',
  '@CollectionPage/LoadMoreCollectionPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCollectionPage = createAsyncAction([
  '@CollectionPage/duplicateCollectionPageRequest',
  '@CollectionPage/duplicateCollectionPageSuccess',
  '@CollectionPage/duplicateCollectionPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCollectionItem {
  type: 'setCurrentCollectionItem';
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
