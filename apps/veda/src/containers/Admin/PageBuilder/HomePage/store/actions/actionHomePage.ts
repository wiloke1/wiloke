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

export const actionCreateHomePage = createAsyncAction(['@HomePage/createPageRequest', '@HomePage/createPageSuccess', '@HomePage/createPageFailure'])<
  { name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void },
  undefined,
  undefined
>();

export const actionGetHomePages = createAsyncAction(['@HomePage/getPagesRequest', '@HomePage/getPagesSuccess', '@HomePage/getPagesFailure'])<
  { s?: string; pageType: PageType; filterType: FilterTypePage },
  { data: ServerResponseAdminPage['info'] },
  undefined
>();

export const actionDeleteHomePages = createAsyncAction([
  '@HomePage/deletePagesRequest',
  '@HomePage/deletePagesSuccess',
  '@HomePage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusHomePage = createAsyncAction([
  '@HomePage/updateStatusPageRequest',
  '@HomePage/updateStatusPageSuccess',
  '@HomePage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreHomePage = createAsyncAction([
  '@HomePage/LoadMoreHomePageRequest',
  '@HomePage/LoadMoreHomePageSuccess',
  '@HomePage/LoadMoreHomePageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateHomePage = createAsyncAction([
  '@HomePage/duplicateHomePageRequest',
  '@HomePage/duplicateHomePageSuccess',
  '@HomePage/duplicateHomePageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentHomeItem {
  type: 'setCurrentHomeItem';
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
