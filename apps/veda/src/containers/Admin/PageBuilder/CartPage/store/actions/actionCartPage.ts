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

export const actionCreateCartPage = createAsyncAction(['@CartPage/createPageRequest', '@CartPage/createPageSuccess', '@CartPage/createPageFailure'])<
  { name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void },
  undefined,
  undefined
>();

export const actionGetCartPages = createAsyncAction(['@CartPage/getPagesRequest', '@CartPage/getPagesSuccess', '@CartPage/getPagesFailure'])<
  { s?: string; pageType: PageType; filterType: FilterTypePage },
  { data: ServerResponseAdminPage['info'] },
  undefined
>();

export const actionDeleteCartPages = createAsyncAction([
  '@CartPage/deletePagesRequest',
  '@CartPage/deletePagesSuccess',
  '@CartPage/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusCartPage = createAsyncAction([
  '@CartPage/updateStatusPageRequest',
  '@CartPage/updateStatusPageSuccess',
  '@CartPage/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreCartPage = createAsyncAction([
  '@CartPage/LoadMoreCartPageRequest',
  '@CartPage/LoadMoreCartPageSuccess',
  '@CartPage/LoadMoreCartPageFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateCartPage = createAsyncAction([
  '@CartPage/duplicateCartPageRequest',
  '@CartPage/duplicateCartPageSuccess',
  '@CartPage/duplicateCartPageFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentCartItem {
  type: 'setCurrentCartItem';
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
