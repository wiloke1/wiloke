import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { PageType } from 'types/Page';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getPagesTemplate = createAsyncAction([
  '@PageManager/getPagesTemplate/request',
  '@PageManager/getPagesTemplate/success',
  '@PageManager/getPagesTemplate/failure',
])<{ pageType: PageType }, { hasNextPage: boolean; data: AdminPageDatabase[]; pageType: PageType }, { pageType: PageType }>();

export const loadMorePagesTemplate = createAsyncAction([
  '@PageManager/loadMorePagesTemplate/request',
  '@PageManager/loadMorePagesTemplate/success',
  '@PageManager/loadMorePagesTemplate/failure',
])<{ cursor: string; pageType: PageType }, { hasNextPage: boolean; data: AdminPageDatabase[]; pageType: PageType }, { pageType: PageType }>();

export const useGetPagesTemplate = createDispatchAsyncAction(getPagesTemplate);
export const useLoadMorePagesTemplate = createDispatchAsyncAction(loadMorePagesTemplate);
