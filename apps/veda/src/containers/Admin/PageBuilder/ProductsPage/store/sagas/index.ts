import { watchCreateProductPage } from './watchCreateProductPage';
import { watchUpdateStatusProductPage } from './watchUpdateStatusProductPage';
import { watchDeleteProductPages } from './watchDeleteProductPages';
import { watchGetProductPages } from './watchGetProductPages';
import { watchDuplicateProductPage } from './watchDuplicateProductPage';
import { watchLoadMoreProductPages } from './wactchLoadMore';

export const sagasProductPage = [
  watchCreateProductPage,
  watchUpdateStatusProductPage,
  watchDeleteProductPages,
  watchGetProductPages,
  watchDuplicateProductPage,
  watchLoadMoreProductPages,
];
