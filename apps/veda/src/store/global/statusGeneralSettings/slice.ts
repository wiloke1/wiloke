import { Action, ActionTypes, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { getGeneralThemeSettings, getGeneralSettingsPage } from './actions';

interface StatusGeneralSettingState {
  getThemeSettingsStatus: Status;
  getPageSettingsStatus: Status;
}

type ExtraAddonsActions = ActionTypes<typeof getGeneralThemeSettings | typeof getGeneralSettingsPage>;

const sliceStatusGeneralSetting = createSlice<StatusGeneralSettingState, Action, ExtraAddonsActions>({
  initialState: {
    getPageSettingsStatus: 'idle',
    getThemeSettingsStatus: 'idle',
  },
  name: '',
  reducers: [],
  extraReducers: [
    handleAction('@Global/getGeneralThemeSettings/request', ({ state }) => {
      state.getThemeSettingsStatus = 'loading';
    }),
    handleAction('@Global/getGeneralThemeSettings/success', ({ state }) => {
      state.getThemeSettingsStatus = 'success';
    }),
    handleAction('@Global/getGeneralThemeSettings/failure', ({ state }) => {
      state.getThemeSettingsStatus = 'failure';
    }),

    handleAction('@Global/getGeneralSettingsPage/request', ({ state }) => {
      state.getPageSettingsStatus = 'loading';
    }),
    handleAction('@Global/getGeneralSettingsPage/success', ({ state }) => {
      state.getPageSettingsStatus = 'success';
    }),
    handleAction('@Global/getGeneralSettingsPage/failure', ({ state }) => {
      state.getPageSettingsStatus = 'failure';
    }),
  ],
});

const useGetGeneralThemeSettings = createDispatchAsyncAction(getGeneralThemeSettings);
const useGetGeneralSettingsPage = createDispatchAsyncAction(getGeneralSettingsPage);

export { sliceStatusGeneralSetting, useGetGeneralThemeSettings, useGetGeneralSettingsPage };
