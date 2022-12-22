import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface IsDraggingAction {
  type: 'setIsDragging';
  payload: boolean;
}

type IsDraggingState = boolean;

export const sliceIsDragging = createSlice<IsDraggingState, IsDraggingAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('setIsDragging', ({ action }) => action.payload)],
});

export const useSetIsDragging = createDispatchAction(sliceIsDragging.actions.setIsDragging);
