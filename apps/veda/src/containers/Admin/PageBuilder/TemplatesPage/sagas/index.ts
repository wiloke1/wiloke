import { watchDeleteMyTemplatePage } from './watchDeleteMyTemplatePage';
import { watchDeleteTemplatePage } from './watchDeleteTemplatePage';
import { watchGetMyTemplates, watchLoadMoreMyTemplates } from './watchGetMyTemplates';
import { watchGetTemplatesPage, watchLoadMoreTemplatePage } from './watchGetTemplatesPage';
import { watchSaveToTemplate } from './watchSaveToTemplate';

export const sagasTemplatePage = [
  watchGetTemplatesPage,
  watchSaveToTemplate,
  watchLoadMoreTemplatePage,
  watchGetMyTemplates,
  watchLoadMoreMyTemplates,
  watchDeleteTemplatePage,
  watchDeleteMyTemplatePage,
];
