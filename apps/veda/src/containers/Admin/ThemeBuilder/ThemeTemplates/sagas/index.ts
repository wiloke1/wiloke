import { watchDeleteProductTheme } from './watchDeleteProductTheme';
import { watchGetCurrentTheme } from './watchGetCurrentTheme/watchGetCurrentTheme';
import { watchGetThemeTemplates } from './watchGetThemeTemplates';
import { watchImportThemeAtomToClient } from './watchImportTheme';

export const sagasThemeTemplates = [watchGetThemeTemplates, watchGetCurrentTheme, watchImportThemeAtomToClient, watchDeleteProductTheme];
