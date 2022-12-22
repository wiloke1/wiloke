import { Theme, ThemeSettings } from 'types/Result';
import { DevTheme } from 'types/Theme';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getThemesDraft = createAsyncAction([
  '@ThemeManager/getThemesDraft/request',
  '@ThemeManager/getThemesDraft/success',
  '@ThemeManager/getThemesDraft/failure',
])<undefined, { hasNextPage: boolean; data: DevTheme[] }, undefined>();

export const loadMoreThemesDraft = createAsyncAction([
  '@ThemeManager/loadMoreThemesDraft/request',
  '@ThemeManager/loadMoreThemesDraft/success',
  '@ThemeManager/loadMoreThemesDraft/failure',
])<{ cursor: string }, { hasNextPage: boolean; data: DevTheme[] }, undefined>();

export const createThemeDraft = createAsyncAction([
  '@ThemeManager/createThemeDraft/request',
  '@ThemeManager/createThemeDraft/success',
  '@ThemeManager/createThemeDraft/failure',
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
  { data: DevTheme },
  undefined
>();

export const appendPageToThemeDraft = createAsyncAction([
  '@ThemeManager/appendPageToThemeDraft/request',
  '@ThemeManager/appendPageToThemeDraft/success',
  '@ThemeManager/appendPageToThemeDraft/failure',
])<
  {
    prevThemeData: DevTheme;
    pageCommandIdsNeedImport: string[];
    label: string;
    featuredImage: string;
  },
  { data: DevTheme },
  undefined
>();

export const approveThemeDraft = createAsyncAction([
  '@ThemeManager/approveThemeDraft/request',
  '@ThemeManager/approveThemeDraft/success',
  '@ThemeManager/approveThemeDraft/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const rejectThemeDraft = createAsyncAction([
  '@ThemeManager/rejectThemeDraft/request',
  '@ThemeManager/rejectThemeDraft/success',
  '@ThemeManager/rejectThemeDraft/failure',
])<{ item: DevTheme; message: string }, { commandId: string; newItem: DevTheme }, { commandId: string }>();

export const deleteThemeDraft = createAsyncAction([
  '@ThemeManager/deleteThemeDraft/request',
  '@ThemeManager/deleteThemeDraft/success',
  '@ThemeManager/deleteThemeDraft/failure',
])<{ commandId: string; name: string }, { commandId: string }, { commandId: string }>();

export const forkThemeAtom = createAsyncAction([
  '@ThemeManager/forkThemeAtom/request',
  '@ThemeManager/forkThemeAtom/success',
  '@ThemeManager/forkThemeAtom/failure',
])<{ commandId: string; callback: (commandId: string) => void }, { commandId: string }, { commandId: string }>();

export const commitThemeDraft = createAsyncAction([
  '@ThemeManager/commitThemeDraft/request',
  '@ThemeManager/commitThemeDraft/success',
  '@ThemeManager/commitThemeDraft/failure',
])<{ item: DevTheme; message: string }, { commandId: string; newItem: DevTheme }, { commandId: string }>();

export const useGetThemesDraft = createDispatchAsyncAction(getThemesDraft);
export const useLoadMoreThemesDraft = createDispatchAsyncAction(loadMoreThemesDraft);
export const useCreateThemeDraft = createDispatchAsyncAction(createThemeDraft);
export const useApproveThemeDraft = createDispatchAsyncAction(approveThemeDraft);
export const useDeleteThemeDraft = createDispatchAsyncAction(deleteThemeDraft);
export const useForkThemeAtom = createDispatchAsyncAction(forkThemeAtom);
export const useRejectThemeDraft = createDispatchAsyncAction(rejectThemeDraft);
export const useCommitThemeDraft = createDispatchAsyncAction(commitThemeDraft);
export const useAppendPageToThemeDraft = createDispatchAsyncAction(appendPageToThemeDraft);
