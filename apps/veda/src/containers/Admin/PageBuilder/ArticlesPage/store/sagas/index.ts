import { watchCreateArticlePage } from './watchCreateArticlePage';
import { watchUpdateStatusArticlePage } from './watchUpdateStatusArticlePage';
import { watchDeleteArticlePages } from './watchDeleteArticlePages';
import { watchGetArticlePages } from './watchGetArticlePages';
import { watchLoadMoreArticlePages } from './watchLoadMore';

export const sagasArticlePage = [
  watchCreateArticlePage,
  watchUpdateStatusArticlePage,
  watchDeleteArticlePages,
  watchGetArticlePages,
  watchLoadMoreArticlePages,
];
