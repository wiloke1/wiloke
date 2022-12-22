import { watchCreateCartPage } from './watchCreateCartPage';
import { watchUpdateStatusCartPage } from './watchUpdateStatusCartPage';
import { watchDeleteCartPages } from './watchDeleteCartPages';
import { watchGetCartPages } from './watchGetCartPages';
import { watchLoadMoreCartPages } from './watchLoadMoreCartPages';

export const sagasCartPage = [watchCreateCartPage, watchUpdateStatusCartPage, watchDeleteCartPages, watchGetCartPages, watchLoadMoreCartPages];
