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

export const actionCreateGiftCard = createAsyncAction(['@GiftCard/createPageRequest', '@GiftCard/createPageSuccess', '@GiftCard/createPageFailure'])<
  { name: string; templateId: string; includeHeaderFooter: boolean; callback?: (id: string) => void },
  undefined,
  undefined
>();

export const actionGetGiftCard = createAsyncAction(['@GiftCard/getPagesRequest', '@GiftCard/getPagesSuccess', '@GiftCard/getPagesFailure'])<
  { s?: string; pageType: PageType; filterType: FilterTypePage },
  { data: ServerResponseAdminPage['info'] },
  undefined
>();

export const actionDeleteGiftCard = createAsyncAction([
  '@GiftCard/deletePagesRequest',
  '@GiftCard/deletePagesSuccess',
  '@GiftCard/deletePagesFailure',
])<{ ids: string[]; onFulfill: () => void }, { ids: string[] }, { id: string }>();

export const actionUpdateStatusGiftCard = createAsyncAction([
  '@GiftCard/updateStatusPageRequest',
  '@GiftCard/updateStatusPageSuccess',
  '@GiftCard/updateStatusPageFailure',
])<UpdateStatusPageRequest, UpdateStatusPageSuccess, UpdateStatusPageFailure>();

export const actionLoadMoreGiftCard = createAsyncAction([
  '@GiftCard/LoadMoreGiftCardRequest',
  '@GiftCard/LoadMoreGiftCardSuccess',
  '@GiftCard/LoadMoreGiftCardFailure',
])<
  { s?: string; pageType: PageType; filterType: FilterTypePage; lastCursor: string },
  { data: ServerResponseAdminPage['info']; hasNextPage: boolean },
  undefined
>();

export const actionDuplicateGiftCard = createAsyncAction([
  '@GiftCard/duplicateGiftCardRequest',
  '@GiftCard/duplicateGiftCardSuccess',
  '@GiftCard/duplicateGiftCardFailure',
])<{ name: string; id: string }, { item: AdminPageData; parentId: string }, { parentId: string }>();

export interface SetCurrentGiftCardItem {
  type: 'setCurrentGiftCardItem';
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
