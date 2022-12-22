import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface Actions {
  type: 'setAskBeforeSaveVisible';
  payload: boolean;
}

interface State {
  visible: boolean;
}

export const sliceAskBeforeSave = createSlice<State, Actions>({
  name: '@Global',
  initialState: {
    visible: false,
  },
  reducers: [handleAction('setAskBeforeSaveVisible', ({ state, action }) => ({ ...state, visible: action.payload }))],
});

export const { setAskBeforeSaveVisible } = sliceAskBeforeSave.actions;
export const useSetAskBeforeSaveVisible = createDispatchAction(setAskBeforeSaveVisible);

export const askBeforeSaveSelector = (state: AppState) => state.askBeforeSave;
