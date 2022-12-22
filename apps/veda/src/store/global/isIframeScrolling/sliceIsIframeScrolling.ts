import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface IsScrollingAction {
  type: 'setIsIframeScrolling';
  payload: boolean;
}

type IsScrollingState = boolean;

export const sliceIsIframeScrolling = createSlice<IsScrollingState, IsScrollingAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('setIsIframeScrolling', ({ action }) => action.payload)],
});

export const { setIsIframeScrolling } = sliceIsIframeScrolling.actions;
export const useSetIsIframeScrolling = createDispatchAction(setIsIframeScrolling);

export const iframeScrollingSelector = (state: AppState) => state.global.isIframeScrolling;
