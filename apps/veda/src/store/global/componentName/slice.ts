import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface ComponentNameAction {
  type: 'setComponentName';
  payload: string;
}
type ComponentNameState = string;

export const sliceComponentName = createSlice<ComponentNameState, ComponentNameAction>({
  name: '@Global',
  initialState: '',
  reducers: [handleAction('setComponentName', ({ action }) => action.payload)],
});

export const useSetComponentName = createDispatchAction(sliceComponentName.actions.setComponentName);
