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

export const actionCreatePasswordPage = createAsyncAction([
  '@PasswordPage/createPageRequest',
  '@PasswordPage/createPageSuccess',
  '@PasswordPage/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetPasswordPages = createAsyncAction([
  '@PasswordPage/getPagesRequest',
  '@PasswordPage/getPagesSuccess',
  '@PasswordPage/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeletePasswordPages = createAsyncAction([
  '@PasswordPage/deletePagesRequest',
  '@PasswordPage/deletePagesSuccess',
  '@PasswordPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusPasswordPage = createAsyncAction([
  '@PasswordPage/updateStatusPageRequest',
  '@PasswordPage/updateStatusPageSuccess',
  '@PasswordPage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMorePasswordPage = createAsyncAction([
  '@PasswordPage/LoadMorePasswordPageRequest',
  '@PasswordPage/LoadMorePasswordPageSuccess',
  '@PasswordPage/LoadMorePasswordPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicatePasswordPage = createAsyncAction([
  '@PasswordPage/duplicatePasswordPageRequest',
  '@PasswordPage/duplicatePasswordPageSuccess',
  '@PasswordPage/duplicatePasswordPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentPasswordItem {
  type: 'setCurrentPasswordItem';
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
