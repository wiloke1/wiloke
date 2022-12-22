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

export const actionCreateSearchPage = createAsyncAction([
  '@SearchPage/createPageRequest',
  '@SearchPage/createPageSuccess',
  '@SearchPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetSearchPages = createAsyncAction(['@SearchPage/getPagesRequest', '@SearchPage/getPagesSuccess', '@SearchPage/getPagesFailure'])<
  { s?: string; pageType: PageType; filterType: FilterTypePage },
  { data: ServerResponseAdminPage['info'] },
  undefined
>();

export const actionDeleteSearchPages = createAsyncAction([
  '@SearchPage/deletePagesRequest',
  '@SearchPage/deletePagesSuccess',
  '@SearchPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusSearchPage = createAsyncAction([
  '@SearchPage/updateStatusPageRequest',
  '@SearchPage/updateStatusPageSuccess',
  '@SearchPage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreSearchPage = createAsyncAction([
  '@SearchPage/LoadMoreSearchPageRequest',
  '@SearchPage/LoadMoreSearchPageSuccess',
  '@SearchPage/LoadMoreSearchPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateSearchPage = createAsyncAction([
  '@SearchPage/duplicateSearchPageRequest',
  '@SearchPage/duplicateSearchPageSuccess',
  '@SearchPage/duplicateSearchPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentSearchItem {
  type: 'setCurrentSearchItem';
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
