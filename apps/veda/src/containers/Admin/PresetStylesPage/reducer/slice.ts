import { PresetStyle } from 'types/PresetStyles';
import { Action, ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { getPresetStyles, installPresetStyle } from './actions';

type ExtraActions = ActionTypes<typeof getPresetStyles | typeof installPresetStyle>;

type PresetStyleId = string;

export interface PresetStyleState {
  getStatus: Status;
  installStatus: Record<PresetStyleId, Status>;
  presetStyles: PresetStyle[];
}

const slicePresetStyle = createSlice<PresetStyleState, Action, ExtraActions>({
  initialState: {
    getStatus: 'idle',
    installStatus: {},
    presetStyles: [],
  },
  name: '',
  reducers: [],
  extraReducers: [
    handleAction('@PresetStyle/getPresetStyles/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@PresetStyle/getPresetStyles/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.presetStyles = action.payload.data;
    }),
    handleAction('@PresetStyle/getPresetStyles/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),
    handleAction('@PresetStyle/installPresetStyle/request', ({ state, action }) => {
      state.installStatus[action.payload.id] = 'loading';
    }),
    handleAction('@PresetStyle/installPresetStyle/success', ({ state, action }) => {
      state.installStatus[action.payload.id] = 'success';
    }),
    handleAction('@PresetStyle/installPresetStyle/failure', ({ state, action }) => {
      state.installStatus[action.payload.id] = 'failure';
    }),
  ],
});

export { slicePresetStyle };
