import { watchCreateHomePage } from './watchCreateHomePage';
import { watchUpdateStatusHomePage } from './watchUpdateStatusHomePage';
import { watchDeleteHomePages } from './watchDeleteHomePages';
import { watchGetHomePages } from './watchGetHomePages';
import { watchLoadMoreHomePages } from './watchLoadMore';

export const sagasHomePage = [watchCreateHomePage, watchUpdateStatusHomePage, watchDeleteHomePages, watchGetHomePages, watchLoadMoreHomePages];
