import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export type IframeLoadedState = boolean;
export interface IframeLoadedAction {
  type: 'setIframeLoaded';
  payload: boolean;
}

export const sliceIframeLoaded = createSlice<IframeLoadedState, IframeLoadedAction>({
  name: '@BuilderPage',
  initialState: false,
  reducers: [handleAction('setIframeLoaded', ({ action }) => action.payload)],
});

export const { setIframeLoaded } = sliceIframeLoaded.actions;
export const useSetIframeLoaded = createDispatchAction(setIframeLoaded);
export const iframeLoadedSelector = (state: AppState) => state.builderPage.iframeLoaded;
