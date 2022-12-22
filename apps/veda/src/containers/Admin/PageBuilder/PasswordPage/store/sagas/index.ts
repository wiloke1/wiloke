import { watchCreatePasswordPage } from './watchCreatePasswordPage';
import { watchUpdateStatusPasswordPage } from './watchUpdateStatusPasswordPage';
import { watchDeletePasswordPages } from './watchDeletePasswordPages';
import { watchGetPasswordPages } from './watchGetPasswordPages';
import { watchLoadMorePasswordPages } from './watchLoadMorePasswordPages';

export const sagasPasswordPage = [
  watchCreatePasswordPage,
  watchUpdateStatusPasswordPage,
  watchDeletePasswordPages,
  watchGetPasswordPages,
  watchLoadMorePasswordPages,
];
