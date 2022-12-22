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

export const actionCreateCustomerLogin = createAsyncAction([
  '@CustomerLogin/createPageRequest',
  '@CustomerLogin/createPageSuccess',
  '@CustomerLogin/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerLogins = createAsyncAction([
  '@CustomerLogin/getPagesRequest',
  '@CustomerLogin/getPagesSuccess',
  '@CustomerLogin/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerLogins = createAsyncAction([
  '@CustomerLogin/deletePagesRequest',
  '@CustomerLogin/deletePagesSuccess',
  '@CustomerLogin/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerLogin = createAsyncAction([
  '@CustomerLogin/updateStatusPageRequest',
  '@CustomerLogin/updateStatusPageSuccess',
  '@CustomerLogin/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerLogin = createAsyncAction([
  '@CustomerLogin/LoadMoreCustomerLoginRequest',
  '@CustomerLogin/LoadMoreCustomerLoginSuccess',
  '@CustomerLogin/LoadMoreCustomerLoginFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerLogin = createAsyncAction([
  '@CustomerLogin/duplicateCustomerLoginRequest',
  '@CustomerLogin/duplicateCustomerLoginSuccess',
  '@CustomerLogin/duplicateCustomerLoginFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerLoginItem {
  type: 'setCurrentCustomerLoginItem';
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
