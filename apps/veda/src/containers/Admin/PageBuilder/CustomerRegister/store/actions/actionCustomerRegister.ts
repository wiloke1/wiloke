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

export const actionCreateCustomerRegister = createAsyncAction([
  '@CustomerRegister/createPageRequest',
  '@CustomerRegister/createPageSuccess',
  '@CustomerRegister/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerRegisters = createAsyncAction([
  '@CustomerRegister/getPagesRequest',
  '@CustomerRegister/getPagesSuccess',
  '@CustomerRegister/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerRegisters = createAsyncAction([
  '@CustomerRegister/deletePagesRequest',
  '@CustomerRegister/deletePagesSuccess',
  '@CustomerRegister/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerRegister = createAsyncAction([
  '@CustomerRegister/updateStatusPageRequest',
  '@CustomerRegister/updateStatusPageSuccess',
  '@CustomerRegister/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerRegister = createAsyncAction([
  '@CustomerRegister/LoadMoreCustomerRegisterRequest',
  '@CustomerRegister/LoadMoreCustomerRegisterSuccess',
  '@CustomerRegister/LoadMoreCustomerRegisterFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerRegister = createAsyncAction([
  '@CustomerRegister/duplicateCustomerRegisterRequest',
  '@CustomerRegister/duplicateCustomerRegisterSuccess',
  '@CustomerRegister/duplicateCustomerRegisterFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerRegisterItem {
  type: 'setCurrentCustomerRegisterItem';
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
