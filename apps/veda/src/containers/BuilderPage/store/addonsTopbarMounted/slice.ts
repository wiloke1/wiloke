import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface AddonsTopBarMountedAction {
  type: 'setAddonTopBarMounted';
  payload: boolean;
}
type AddonsTopBarMountedState = boolean;

export const sliceAddonsTopBarMounted = createSlice<AddonsTopBarMountedState, AddonsTopBarMountedAction>({
  name: '@BuilderPage',
  initialState: false,
  reducers: [handleAction('setAddonTopBarMounted', ({ action }) => action.payload)],
});

export const { setAddonTopBarMounted } = sliceAddonsTopBarMounted.actions;
export const useSetAddonTopBarMounted = createDispatchAction(setAddonTopBarMounted);
export const addonsTopBarMountedSelector = (state: AppState) => state.builderPage.addonsTopBarMounted;
