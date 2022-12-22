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

export const actionCreateNotFoundPage = createAsyncAction([
  '@NotFoundPage/createPageRequest',
  '@NotFoundPage/createPageSuccess',
  '@NotFoundPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetNotFoundPages = createAsyncAction([
  '@NotFoundPage/getPagesRequest',
  '@NotFoundPage/getPagesSuccess',
  '@NotFoundPage/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteNotFoundPages = createAsyncAction([
  '@NotFoundPage/deletePagesRequest',
  '@NotFoundPage/deletePagesSuccess',
  '@NotFoundPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusNotFoundPage = createAsyncAction([
  '@NotFoundPage/updateStatusPageRequest',
  '@NotFoundPage/updateStatusPageSuccess',
  '@NotFoundPage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreNotFoundPage = createAsyncAction([
  '@NotFoundPage/LoadMoreNotFoundPageRequest',
  '@NotFoundPage/LoadMoreNotFoundPageSuccess',
  '@NotFoundPage/LoadMoreNotFoundPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateNotFoundPage = createAsyncAction([
  '@NotFoundPage/duplicateNotFoundPageRequest',
  '@NotFoundPage/duplicateNotFoundPageSuccess',
  '@NotFoundPage/duplicateNotFoundPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentNotFoundItem {
  type: 'setCurrentNotFoundItem';
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
