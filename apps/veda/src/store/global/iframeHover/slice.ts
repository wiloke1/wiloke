import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface IframeHoverAction {
  type: 'setIframeHover';
  payload: boolean;
}
type IframeHoverState = boolean;

export const sliceIframeHover = createSlice<IframeHoverState, IframeHoverAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('setIframeHover', ({ action }) => action.payload)],
});

export const { setIframeHover } = sliceIframeHover.actions;
export const useSetIframeHover = createDispatchAction(setIframeHover);
