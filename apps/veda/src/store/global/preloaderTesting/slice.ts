import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface PreloaderTestingAction {
  type: 'setPreloaderTesting';
  payload: boolean;
}
type PreloaderTestingState = boolean;

export const slicePreloaderTesting = createSlice<PreloaderTestingState, PreloaderTestingAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('setPreloaderTesting', ({ action }) => action.payload)],
});

export const useSetPreloaderTesting = createDispatchAction(slicePreloaderTesting.actions.setPreloaderTesting);
