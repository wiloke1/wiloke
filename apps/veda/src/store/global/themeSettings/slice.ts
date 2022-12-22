import { ThemeGeneralSettings } from 'types/Result';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { SetThemeGeneralSettings } from './actions';

type ThemeActions = SetThemeGeneralSettings;

const defaultThemeGeneralSettings: ThemeGeneralSettings = {
  preloaderEnable: false,
  preloaderVariant: 0,
  preloaderBackgroundColor: '',
  preloaderColor: '',
  preloaderLogo: '',
  favicon: '',
  label: '',
};

const initialState: ThemeGeneralSettings = defaultThemeGeneralSettings;

const sliceThemeGeneralSettings = createSlice<ThemeGeneralSettings, ThemeActions>({
  name: '@Global',
  initialState,
  reducers: [
    handleAction('setThemeGeneralSettings', ({ state, action }) => {
      if (action.payload.preloaderEnable !== undefined) {
        state.preloaderEnable = action.payload.preloaderEnable;
      }
      if (action.payload.preloaderBackgroundColor !== undefined) {
        state.preloaderBackgroundColor = action.payload.preloaderBackgroundColor;
      }
      if (action.payload.preloaderColor !== undefined) {
        state.preloaderColor = action.payload.preloaderColor;
      }
      if (action.payload.preloaderVariant !== undefined) {
        state.preloaderVariant = action.payload.preloaderVariant;
      }
      if (action.payload.preloaderLogo !== undefined) {
        state.preloaderLogo = action.payload.preloaderLogo;
      }
      if (action.payload.favicon !== undefined) {
        state.favicon = action.payload.favicon;
      }
      if (action.payload.label !== undefined) {
        state.label = action.payload.label;
      }
    }),
  ],
});
const { setThemeGeneralSettings } = sliceThemeGeneralSettings.actions;
export { sliceThemeGeneralSettings, setThemeGeneralSettings };
export const useSetThemeGeneralSettings = createDispatchAction(setThemeGeneralSettings);
