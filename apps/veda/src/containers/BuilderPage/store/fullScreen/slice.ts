import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface FullScreenAction {
  type: 'toggleFullScreen';
  payload: undefined;
}

type FullScreenState = boolean;

export const sliceFullScreen = createSlice<FullScreenState, FullScreenAction>({
  name: '@BuilderPage',
  initialState: false,
  reducers: [handleAction('toggleFullScreen', ({ state }) => !state)],
});

export const { toggleFullScreen } = sliceFullScreen.actions;
export const useToggleFullScreen = createDispatchAction(toggleFullScreen);
