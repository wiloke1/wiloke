import { watchActiveThemeVeda } from './ThemeDashboard/sagas/watchActiveThemeVeda';
import { watchChangeThemeShopifyActivate } from './ThemeDashboard/sagas/watchChangeThemeActivateShopify';
import { watchDeleteClientTheme } from './ThemeDashboard/sagas/watchDeleteClientTheme';
import { watchGetClientThemes } from './ThemeDashboard/sagas/watchGetClientThemes';
import { watchGetThemesShopify } from './ThemeDashboard/sagas/watchGetThemesShopify';
import { watchLoadMoreClientThemes } from './ThemeDashboard/sagas/watchLoadMoreClientThemes';
import { watchMigrateThemeShopify } from './ThemeDashboard/sagas/watchMigrateThemeShopify';
import { watchUpdateThemeActiveSettings } from './ThemeSettings/sagas';

export const sagaThemeBuilder = [
  watchUpdateThemeActiveSettings,
  watchGetClientThemes,
  watchDeleteClientTheme,
  watchLoadMoreClientThemes,
  watchGetThemesShopify,
  watchMigrateThemeShopify,
  watchChangeThemeShopifyActivate,
  watchActiveThemeVeda,
];
