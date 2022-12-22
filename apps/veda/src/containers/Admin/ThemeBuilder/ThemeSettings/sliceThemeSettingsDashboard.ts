import { Theme, ThemeSettings } from 'types/Result';
import { ActionTypes, createAsyncAction, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type PickType1 = Pick<Theme, 'vendors' | 'globalJs' | 'globalScss'>;

export interface RequestThemeSetting extends PickType1 {
  themeSettings: ThemeSettings;
}

export const updateThemeActiveSettings = createAsyncAction([
  '@Global/updateThemeActiveSettings/request',
  '@Global/updateThemeActiveSettings/success',
  '@Global/updateThemeActiveSettings/failure',
])<{ commandId: string; body: Partial<RequestThemeSetting>; onFulfill: () => void }, undefined, undefined>();

interface Actions {
  type: 'setModalThemeDashboardVisible';
  payload: boolean;
}

type ExtraActions = ActionTypes<typeof updateThemeActiveSettings>;

interface State {
  visible: boolean;
  updateThemeActiveStatus: Status;
}

export const sliceThemeDashboardSettings = createSlice<State, Actions, ExtraActions>({
  initialState: {
    visible: false,
    updateThemeActiveStatus: 'idle',
  },
  name: '@Dashboard',
  reducers: [handleAction('setModalThemeDashboardVisible', ({ state, action }) => ({ ...state, visible: action.payload }))],
  extraReducers: [
    handleAction('@Global/updateThemeActiveSettings/request', ({ state }) => ({ ...state, updateThemeActiveStatus: 'loading' })),
    handleAction('@Global/updateThemeActiveSettings/success', ({ state }) => ({ ...state, updateThemeActiveStatus: 'success' })),
    handleAction('@Global/updateThemeActiveSettings/failure', ({ state }) => ({ ...state, updateThemeActiveStatus: 'failure' })),
  ],
});

export const { setModalThemeDashboardVisible } = sliceThemeDashboardSettings.actions;

export const useSetModalThemeDashboardVisible = createDispatchAction(setModalThemeDashboardVisible);

export const themeDashboardSettingSelector = (state: AppState) => state.adminDashboard.themeBuilder.themeSettings;
export const useUpdateThemeActiveSettings = createDispatchAsyncAction(updateThemeActiveSettings);
