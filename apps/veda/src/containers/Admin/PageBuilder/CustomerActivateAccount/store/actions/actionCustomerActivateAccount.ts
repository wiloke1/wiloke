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

export const actionCreateCustomerActivateAccount = createAsyncAction([
  '@CustomerActivateAccount/createPageRequest',
  '@CustomerActivateAccount/createPageSuccess',
  '@CustomerActivateAccount/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerActivateAccounts = createAsyncAction([
  '@CustomerActivateAccount/getPagesRequest',
  '@CustomerActivateAccount/getPagesSuccess',
  '@CustomerActivateAccount/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerActivateAccounts = createAsyncAction([
  '@CustomerActivateAccount/deletePagesRequest',
  '@CustomerActivateAccount/deletePagesSuccess',
  '@CustomerActivateAccount/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerActivateAccount = createAsyncAction([
  '@CustomerActivateAccount/updateStatusPageRequest',
  '@CustomerActivateAccount/updateStatusPageSuccess',
  '@CustomerActivateAccount/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerActivateAccount = createAsyncAction([
  '@CustomerActivateAccount/LoadMoreCustomerActivateAccountRequest',
  '@CustomerActivateAccount/LoadMoreCustomerActivateAccountSuccess',
  '@CustomerActivateAccount/LoadMoreCustomerActivateAccountFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerActivateAccount = createAsyncAction([
  '@CustomerActivateAccount/duplicateCustomerActivateAccountRequest',
  '@CustomerActivateAccount/duplicateCustomerActivateAccountSuccess',
  '@CustomerActivateAccount/duplicateCustomerActivateAccountFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerActivateAccountItem {
  type: 'setCurrentCustomerActivateAccountItem';
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
