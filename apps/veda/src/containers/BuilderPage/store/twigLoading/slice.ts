import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export type TwigLoadingState = boolean;
export interface TwigLoadingAction {
  type: 'setTwigLoading';
  payload: TwigLoadingState;
}

export const sliceTwigLoading = createSlice<TwigLoadingState, TwigLoadingAction>({
  name: '@BuilderPage',
  initialState: true,
  reducers: [handleAction('setTwigLoading', ({ action }) => action.payload)],
});

export const { setTwigLoading } = sliceTwigLoading.actions;
export const useSetTwigLoading = createDispatchAction(setTwigLoading);
export const twigLoadingSelector = (state: AppState) => state.builderPage.twigLoading;
