import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface GlobalThemeJsAction {
  type: 'setGlobalThemeJs';
  payload: string;
}

export type GlobalThemeJsState = string;

export const sliceGlobalThemeJs = createSlice<GlobalThemeJsState, GlobalThemeJsAction>({
  name: '@Global',
  initialState: '',
  reducers: [handleAction('setGlobalThemeJs', ({ action }) => action.payload)],
});

export const { setGlobalThemeJs } = sliceGlobalThemeJs.actions;
export const useSetGlobalThemeJs = createDispatchAction(setGlobalThemeJs);
export const globalThemeJsSelector = (state: AppState) => state.global.themeSettings.globalJs;
