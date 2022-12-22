import { watchCreateCollectionPage } from './watchCreateCollectionPage';
import { watchUpdateStatusCollectionPage } from './watchUpdateStatusCollectionPage';
import { watchDeleteCollectionPages } from './watchDeleteCollectionPages';
import { watchGetCollectionPages } from './watchGetCollectionPages';
import { watchDuplicateCollectionPage } from './watchDuplicateCollectionPage';
import { watchLoadMoreCollectionPages } from './wactchLoadMore';

export const sagasCollectionPage = [
  watchCreateCollectionPage,
  watchUpdateStatusCollectionPage,
  watchDeleteCollectionPages,
  watchGetCollectionPages,
  watchDuplicateCollectionPage,
  watchLoadMoreCollectionPages,
];
