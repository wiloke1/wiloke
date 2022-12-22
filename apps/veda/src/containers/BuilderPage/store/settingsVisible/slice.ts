import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface SettingsVisibleState {
  visible: boolean;
  keys: string[];
}

export interface SettingsVisibleAction {
  type: 'setSettingsVisible';
  payload: Partial<SettingsVisibleState>;
}

export const sliceSettingsVisible = createSlice<SettingsVisibleState, SettingsVisibleAction>({
  name: 'BuilderPage/settingsVisible',
  initialState: {
    visible: false,
    keys: [],
  },
  reducers: [
    handleAction('setSettingsVisible', ({ state, action }) => {
      state.visible = action.payload.visible ?? state.visible;
      state.keys = action.payload.keys ?? state.keys;
    }),
  ],
});

export const { setSettingsVisible } = sliceSettingsVisible.actions;
export const useSetSettingsVisible = createDispatchAction(setSettingsVisible);
export const settingsVisibleSelector = (state: AppState) => state.builderPage.settingsVisible;
