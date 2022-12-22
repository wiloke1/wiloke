import { watchCreateSearchPage } from './watchCreateSearchPage';
import { watchUpdateStatusSearchPage } from './watchUpdateStatusSearchPage';
import { watchDeleteSearchPages } from './watchDeleteSearchPages';
import { watchGetSearchPages } from './watchGetSearchPages';
import { watchLoadMoreSearchPages } from './watchLoadMoreSearchPages';

export const sagasSearchPage = [
  watchCreateSearchPage,
  watchUpdateStatusSearchPage,
  watchDeleteSearchPages,
  watchGetSearchPages,
  watchLoadMoreSearchPages,
];
