import {
  AdminPageData,
  FilterTypePage,
  ServerResponseAdminPage,
  UpdateStatusPageFailure,
  UpdateStatusPageRequest,
  UpdateStatusPageSuccess,
} from 'containers/Admin/types';
import { PageType } from 'types/Page';

import { createAsyncAction } from 'wiloke-react-core/utils';

export const actionCreateCollectionListing = createAsyncAction([
  '@CollectionListing/createPageRequest',
  '@CollectionListing/createPageSuccess',
  '@CollectionListing/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCollectionListing = createAsyncAction([
  '@CollectionListing/getPagesRequest',
  '@CollectionListing/getPagesSuccess',
  '@CollectionListing/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCollectionListing = createAsyncAction([
  '@CollectionListing/deletePagesRequest',
  '@CollectionListing/deletePagesSuccess',
  '@CollectionListing/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCollectionListing = createAsyncAction([
  '@CollectionListing/updateStatusPageRequest',
  '@CollectionListing/updateStatusPageSuccess',
  '@CollectionListing/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCollectionListing = createAsyncAction([
  '@CollectionListing/LoadMoreCollectionListingRequest',
  '@CollectionListing/LoadMoreCollectionListingSuccess',
  '@CollectionListing/LoadMoreCollectionListingFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCollectionListing = createAsyncAction([
  '@CollectionListing/duplicateCollectionListingRequest',
  '@CollectionListing/duplicateCollectionListingSuccess',
  '@CollectionListing/duplicateCollectionListingFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCollectionListingItem {
  type: 'setCurrentCollectionListingItem';
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
