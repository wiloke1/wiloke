import { ThemeServiceData } from 'types/Theme';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionGetThemeTemplates = createAsyncAction([
  '@ThemeBuilder/getThemeTemplates/request',
  '@ThemeBuilder/getThemeTemplates/success',
  '@ThemeBuilder/getThemeTemplates/failure',
])<{ search: string }, { data: ThemeServiceData[]; maxPages: number }, undefined>();

export const actionGetCurrentTheme = createAsyncAction([
  '@ThemeBuilder/actionGetCurrentTheme/request',
  '@ThemeBuilder/actionGetCurrentTheme/success',
  '@ThemeBuilder/actionGetCurrentTheme/failure',
])<{ themeId: string; variant: EntityType }, { themeId: string }, { themeId: string }>();

export const importThemeAtomToClient = createAsyncAction([
  '@ThemeBuilder/importThemeAtomToClient/request',
  '@ThemeBuilder/importThemeAtomToClient/success',
  '@ThemeBuilder/importThemeAtomToClient/failure',
])<{ themeAtomCommandId: string; onFulfill?: () => void }, { themeAtomCommandId: string }, { themeAtomCommandId: string }>();

export const deleteProductTheme = createAsyncAction([
  '@ThemeBuilder/deleteProductTheme/request',
  '@ThemeBuilder/deleteProductTheme/success',
  '@ThemeBuilder/deleteProductTheme/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const useGetThemeTemplates = createDispatchAsyncAction(actionGetThemeTemplates);
export const useGetCurrentTheme = createDispatchAsyncAction(actionGetCurrentTheme);
export const useImportThemeAtomToClient = createDispatchAsyncAction(importThemeAtomToClient);
export const useDeleteProductTheme = createDispatchAsyncAction(deleteProductTheme);
