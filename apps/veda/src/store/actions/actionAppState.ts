import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setAppState = createAction('@AppState', (appState: AppState) => ({ appState }));

export const useSetAppState = createDispatchAction(setAppState);
