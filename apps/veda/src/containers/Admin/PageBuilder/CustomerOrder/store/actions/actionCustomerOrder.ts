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

export const actionCreateCustomerOrder = createAsyncAction([
  '@CustomerOrder/createPageRequest',
  '@CustomerOrder/createPageSuccess',
  '@CustomerOrder/createPageFailure',
])<{ name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void }, undefined, undefined>();

export const actionGetCustomerOrders = createAsyncAction([
  '@CustomerOrder/getPagesRequest',
  '@CustomerOrder/getPagesSuccess',
  '@CustomerOrder/getPagesFailure',
])<{ s?: string; pageType: PageType; filterType: FilterTypePage }, { data: ServerResponseAdminPage['info'] }, undefined>();

export const actionDeleteCustomerOrders = createAsyncAction([
  '@CustomerOrder/deletePagesRequest',
  '@CustomerOrder/deletePagesSuccess',
  '@CustomerOrder/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCustomerOrder = createAsyncAction([
  '@CustomerOrder/updateStatusPageRequest',
  '@CustomerOrder/updateStatusPageSuccess',
  '@CustomerOrder/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCustomerOrder = createAsyncAction([
  '@CustomerOrder/LoadMoreCustomerOrderRequest',
  '@CustomerOrder/LoadMoreCustomerOrderSuccess',
  '@CustomerOrder/LoadMoreCustomerOrderFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCustomerOrder = createAsyncAction([
  '@CustomerOrder/duplicateCustomerOrderRequest',
  '@CustomerOrder/duplicateCustomerOrderSuccess',
  '@CustomerOrder/duplicateCustomerOrderFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCustomerOrderItem {
  type: 'setCurrentCustomerOrderItem';
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
