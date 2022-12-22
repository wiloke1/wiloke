import { Theme, ThemeSettings } from 'types/Result';
import { SectionCategoryForFrontend } from 'types/Sections';
import { AdminTheme } from 'types/Theme';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getThemesAtom = createAsyncAction([
  '@ThemeManager/getThemesAtom/request',
  '@ThemeManager/getThemesAtom/success',
  '@ThemeManager/getThemesAtom/failure',
])<undefined, { hasNextPage: boolean; data: AdminTheme[] }, undefined>();

export const loadMoreThemesAtom = createAsyncAction([
  '@ThemeManager/loadMoreThemesAtom/request',
  '@ThemeManager/loadMoreThemesAtom/success',
  '@ThemeManager/loadMoreThemesAtom/failure',
])<{ cursor: string }, { hasNextPage: boolean; data: AdminTheme[] }, undefined>();

export const createThemeAtom = createAsyncAction([
  '@ThemeManager/createThemeAtom/request',
  '@ThemeManager/createThemeAtom/success',
  '@ThemeManager/createThemeAtom/failure',
])<
  {
    themeSettings: ThemeSettings;
    pageCommandIds: string[];
    label: string;
    featuredImage: string;
    globalJs: Theme['globalJs'];
    globalScss: Theme['globalScss'];
    vendors: Theme['vendors'];
  },
  { data: AdminTheme },
  undefined
>();

export const appendPageToThemeAtom = createAsyncAction([
  '@ThemeManager/appendPageToThemeAtom/request',
  '@ThemeManager/appendPageToThemeAtom/success',
  '@ThemeManager/appendPageToThemeAtom/failure',
])<
  {
    prevThemeData: AdminTheme;
    pageCommandIdsNeedImport: string[];
    label: string;
    featuredImage: string;
  },
  { data: AdminTheme },
  undefined
>();

export const deleteThemeAtom = createAsyncAction([
  '@ThemeManager/deleteThemeAtom/request',
  '@ThemeManager/deleteThemeAtom/success',
  '@ThemeManager/deleteThemeAtom/failure',
])<{ commandId: string; name: string }, { commandId: string }, { commandId: string }>();

export const publishThemeAtom = createAsyncAction([
  '@ThemeManager/publishThemeAtom/request',
  '@ThemeManager/publishThemeAtom/success',
  '@ThemeManager/publishThemeAtom/failure',
])<{ themeAtom: AdminTheme; categoryOfProduct: undefined | SectionCategoryForFrontend }, undefined, undefined>();

export const hotfixThemeAtom = createAsyncAction([
  '@ThemeManager/hotfixThemeAtom/request',
  '@ThemeManager/hotfixThemeAtom/success',
  '@ThemeManager/hotfixThemeAtom/failure',
])<{ commandId: string; assignToUserId: number; message: string }, { commandId: string }, { commandId: string }>();

export const useGetThemesAtom = createDispatchAsyncAction(getThemesAtom);
export const useLoadMoreThemesAtom = createDispatchAsyncAction(loadMoreThemesAtom);
export const useCreateThemeAtom = createDispatchAsyncAction(createThemeAtom);
export const useAppendPageToThemeAtom = createDispatchAsyncAction(appendPageToThemeAtom);
export const useDeleteThemeAtom = createDispatchAsyncAction(deleteThemeAtom);
export const usePublishThemeAtom = createDispatchAsyncAction(publishThemeAtom);
export const useHotfixThemeAtom = createDispatchAsyncAction(hotfixThemeAtom);
