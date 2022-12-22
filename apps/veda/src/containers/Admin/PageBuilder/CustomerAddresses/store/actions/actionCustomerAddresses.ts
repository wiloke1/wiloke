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

export const actionCreateCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/createPageRequest',
  '@CustomerAddresses/createPageSuccess',
  '@CustomerAddresses/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/getPagesRequest',
  '@CustomerAddresses/getPagesSuccess',
  '@CustomerAddresses/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/deletePagesRequest',
  '@CustomerAddresses/deletePagesSuccess',
  '@CustomerAddresses/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/updateStatusPageRequest',
  '@CustomerAddresses/updateStatusPageSuccess',
  '@CustomerAddresses/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/LoadMoreCustomerAddressesRequest',
  '@CustomerAddresses/LoadMoreCustomerAddressesSuccess',
  '@CustomerAddresses/LoadMoreCustomerAddressesFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerAddresses = createAsyncAction([
  '@CustomerAddresses/duplicateCustomerAddressesRequest',
  '@CustomerAddresses/duplicateCustomerAddressesSuccess',
  '@CustomerAddresses/duplicateCustomerAddressesFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerAddressesItem {
  type: 'setCurrentCustomerAddressesItem';
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
