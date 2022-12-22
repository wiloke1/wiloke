import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface AddonPositionAction {
  type: 'setAddonsPositionStart';
  payload: {
    value: boolean;
    addonsSectionId: string;
  };
}
interface AddonPositionState {
  value: boolean;
  addonsSectionId: string;
}

export const sliceAddonPositionStart = createSlice<AddonPositionState, AddonPositionAction>({
  name: '@IframePage',
  initialState: {
    value: false,
    addonsSectionId: '',
  },
  reducers: [handleAction('setAddonsPositionStart', ({ action }) => action.payload)],
});

export const { setAddonsPositionStart } = sliceAddonPositionStart.actions;
export const useSetAddonsPositionStart = createDispatchAction(setAddonsPositionStart);
