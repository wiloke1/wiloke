import { watchCreateBlankPage } from './watchCreateBlankPage';
import { watchUpdateStatusBlankPage } from './watchUpdateStatusBlankPage';
import { watchDeleteBlankPages } from './watchDeleteBlankPages';
import { watchGetBlankPages } from './watchGetBlankPages';
import { watchGetTemplatesBlank } from './watchGetTemplatesBlank';
import { watchLoadMoreBlankPages } from './watchLoadMore';

export const sagasBlankPage = [
  watchCreateBlankPage,
  watchUpdateStatusBlankPage,
  watchDeleteBlankPages,
  watchGetBlankPages,
  watchGetTemplatesBlank,
  watchLoadMoreBlankPages,
];
