import { watchCreateNotFoundPage } from './watchCreateNotFoundPage';
import { watchUpdateStatusNotFoundPage } from './watchUpdateStatusNotFoundPage';
import { watchDeleteNotFoundPages } from './watchDeleteNotFoundPages';
import { watchGetNotFoundPages } from './watchGetNotFoundPages';
import { watchLoadMoreNotFoundPages } from './watchLoadMoreNotFoundPages';

export const sagasNotFoundPage = [
  watchCreateNotFoundPage,
  watchUpdateStatusNotFoundPage,
  watchDeleteNotFoundPages,
  watchGetNotFoundPages,
  watchLoadMoreNotFoundPages,
];
