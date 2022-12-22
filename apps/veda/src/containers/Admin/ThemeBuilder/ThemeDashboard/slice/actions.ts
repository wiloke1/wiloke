import { ThemeShopify } from 'services/ThemeService/types';
import { ClientTheme, ThemeGeneral } from 'types/Theme';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getThemeVedaActive = createAsyncAction([
  '@Dashboard/getThemeVedaActive/request',
  '@Dashboard/getThemeVedaActive/success',
  '@Dashboard/getThemeVedaActive/failure',
])<undefined, ThemeGeneral, undefined>();

export const getClientThemes = createAsyncAction([
  '@Dashboard/getClientThemes/request',
  '@Dashboard/getClientThemes/success',
  '@Dashboard/getClientThemes/failure',
])<undefined, { data: ClientTheme[]; hasNextPage: boolean }, undefined>();

export const loadMoreClientThemes = createAsyncAction([
  '@Dashboard/loadMoreClientThemes/request',
  '@Dashboard/loadMoreClientThemes/success',
  '@Dashboard/loadMoreClientThemes/failure',
])<undefined, { data: ClientTheme[]; hasNextPage: boolean }, undefined>();

export const deleteClientTheme = createAsyncAction([
  '@Dashboard/deleteClientTheme/request',
  '@Dashboard/deleteClientTheme/success',
  '@Dashboard/deleteClientTheme/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const migrateThemeShopify = createAsyncAction([
  '@Dashboard/migrateThemeShopify/request',
  '@Dashboard/migrateThemeShopify/success',
  '@Dashboard/migrateThemeShopify/failure',
])<{ targetThemeId: string; onFulfill: () => void; forceActive?: boolean }, undefined, undefined>();

export const getThemesShopify = createAsyncAction([
  '@Dashboard/getThemesShopify/request',
  '@Dashboard/getThemesShopify/success',
  '@Dashboard/getThemesShopify/failure',
])<undefined, ThemeShopify[], undefined>();

export const changeThemeShopifyActivate = createAsyncAction([
  '@Dashboard/changeThemeShopifyActivate/request',
  '@Dashboard/changeThemeShopifyActivate/success',
  '@Dashboard/changeThemeShopifyActivate/failure',
])<{ themeId: string }, undefined, undefined>();

export const activeThemeVeda = createAsyncAction([
  '@Dashboard/activeThemeVeda/request',
  '@Dashboard/activeThemeVeda/success',
  '@Dashboard/activeThemeVeda/failure',
])<{ themeId: string }, { themeId: string }, { themeId: string }>();

export const useGetThemeVedaActive = createDispatchAsyncAction(getThemeVedaActive);
export const useGetClientThemes = createDispatchAsyncAction(getClientThemes);
export const useDeleteClientTheme = createDispatchAsyncAction(deleteClientTheme);
export const useLoadMoreClientThemes = createDispatchAsyncAction(loadMoreClientThemes);
export const useMigrateThemeShopify = createDispatchAsyncAction(migrateThemeShopify);
export const useGetThemeShopify = createDispatchAsyncAction(getThemesShopify);
export const useChangeThemeShopifyActivate = createDispatchAsyncAction(changeThemeShopifyActivate);
export const useActiveThemeVeda = createDispatchAsyncAction(activeThemeVeda);
