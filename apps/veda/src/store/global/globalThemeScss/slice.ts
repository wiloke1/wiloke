import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface GlobalThemeScssAction {
  type: 'setGlobalThemeScss';
  payload: string;
}

export type GlobalThemeScssState = string;

export const sliceGlobalThemeScss = createSlice<GlobalThemeScssState, GlobalThemeScssAction>({
  name: '@Global',
  initialState: '',
  reducers: [handleAction('setGlobalThemeScss', ({ action }) => action.payload)],
});

export const { setGlobalThemeScss } = sliceGlobalThemeScss.actions;
export const useSetGlobalThemeScss = createDispatchAction(setGlobalThemeScss);
export const globalThemeScssSelector = (state: AppState) => state.global.themeSettings.globalScss;
