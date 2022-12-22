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

export const actionCreateCustomerResetPassword = createAsyncAction([
  '@CustomerResetPassword/createPageRequest',
  '@CustomerResetPassword/createPageSuccess',
  '@CustomerResetPassword/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerResetPasswords = createAsyncAction([
  '@CustomerResetPassword/getPagesRequest',
  '@CustomerResetPassword/getPagesSuccess',
  '@CustomerResetPassword/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerResetPasswords = createAsyncAction([
  '@CustomerResetPassword/deletePagesRequest',
  '@CustomerResetPassword/deletePagesSuccess',
  '@CustomerResetPassword/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerResetPassword = createAsyncAction([
  '@CustomerResetPassword/updateStatusPageRequest',
  '@CustomerResetPassword/updateStatusPageSuccess',
  '@CustomerResetPassword/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerResetPassword = createAsyncAction([
  '@CustomerResetPassword/LoadMoreCustomerResetPasswordRequest',
  '@CustomerResetPassword/LoadMoreCustomerResetPasswordSuccess',
  '@CustomerResetPassword/LoadMoreCustomerResetPasswordFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerResetPassword = createAsyncAction([
  '@CustomerResetPassword/duplicateCustomerResetPasswordRequest',
  '@CustomerResetPassword/duplicateCustomerResetPasswordSuccess',
  '@CustomerResetPassword/duplicateCustomerResetPasswordFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerResetPasswordItem {
  type: 'setCurrentCustomerResetPasswordItem';
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
