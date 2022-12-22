import { AppSettings } from 'types/AppSettings';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { AppSettingsVisibleAction, getAppSettings, ChangeAppSettings } from './actions';

export interface AppSettingsState {
  status: Status;
  visible: boolean;
  data: AppSettings;
  message: '';
}
export type AppSettingsAction = AppSettingsVisibleAction | ChangeAppSettings;
export type ExtraAppSettingsAction = ActionTypes<typeof getAppSettings>;

export const sliceAppSettings = createSlice<AppSettingsState, AppSettingsAction, ExtraAppSettingsAction>({
  name: '@BuilderPage',
  initialState: {
    status: 'idle',
    visible: false,
    data: {
      currentVersion: {
        commandId: '',
        content: '',
        versionId: '',
        version: '',
      },
      jsHookEnabled: true,
      tsSuggestions: '',
    },
    message: '',
  },
  reducers: [
    handleAction('setAppSettingsVisible', ({ state, action }) => {
      state.visible = action.payload;
    }),
    handleAction('changeAppSettings', ({ state, action }) => {
      state.data = { ...state.data, ...action.payload };
    }),
  ],
  extraReducers: [
    handleAction('@BuilderPage/getAppSettings/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@BuilderPage/getAppSettings/success', ({ state, action }) => {
      state.status = 'success';
      state.data = action.payload.data;
    }),
    handleAction('@BuilderPage/getAppSettings/failure', ({ state, action }) => {
      state.status = 'failure';
      state.message = action.payload.message;
    }),
  ],
});

export const { setAppSettingsVisible, changeAppSettings } = sliceAppSettings.actions;
export const useSetAppSettingsVisible = createDispatchAction(setAppSettingsVisible);
export const useChangeAppSettings = createDispatchAction(changeAppSettings);
export const useGetAppSettings = createDispatchAsyncAction(getAppSettings);
export const appSettingsSelector = (state: AppState) => state.global.appSettings.generalSettings;
