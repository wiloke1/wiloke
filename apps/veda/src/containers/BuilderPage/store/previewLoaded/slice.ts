import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export type PreviewLoadedState = boolean;
export interface PreviewLoadedAction {
  type: 'setPreviewLoaded';
  payload: boolean;
}

export const slicePreviewLoaded = createSlice<PreviewLoadedState, PreviewLoadedAction>({
  name: '@BuilderPage',
  initialState: false,
  reducers: [handleAction('setPreviewLoaded', ({ action }) => action.payload)],
});

export const { setPreviewLoaded } = slicePreviewLoaded.actions;
export const useSetPreviewLoaded = createDispatchAction(setPreviewLoaded);
export const previewLoadedSelector = (state: AppState) => state.builderPage.previewLoaded;
