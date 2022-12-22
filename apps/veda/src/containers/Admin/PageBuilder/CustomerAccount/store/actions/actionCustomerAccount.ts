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

export const actionCreateCustomerAccount = createAsyncAction([
  '@CustomerAccount/createPageRequest',
  '@CustomerAccount/createPageSuccess',
  '@CustomerAccount/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerAccounts = createAsyncAction([
  '@CustomerAccount/getPagesRequest',
  '@CustomerAccount/getPagesSuccess',
  '@CustomerAccount/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerAccounts = createAsyncAction([
  '@CustomerAccount/deletePagesRequest',
  '@CustomerAccount/deletePagesSuccess',
  '@CustomerAccount/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerAccount = createAsyncAction([
  '@CustomerAccount/updateStatusPageRequest',
  '@CustomerAccount/updateStatusPageSuccess',
  '@CustomerAccount/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerAccount = createAsyncAction([
  '@CustomerAccount/LoadMoreCustomerAccountRequest',
  '@CustomerAccount/LoadMoreCustomerAccountSuccess',
  '@CustomerAccount/LoadMoreCustomerAccountFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerAccount = createAsyncAction([
  '@CustomerAccount/duplicateCustomerAccountRequest',
  '@CustomerAccount/duplicateCustomerAccountSuccess',
  '@CustomerAccount/duplicateCustomerAccountFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerAccountItem {
  type: 'setCurrentCustomerAccountItem';
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
