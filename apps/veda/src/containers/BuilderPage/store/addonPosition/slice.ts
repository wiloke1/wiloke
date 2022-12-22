import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface AddonPositionAction {
  type: 'setAddonsPositionStart';
  payload: {
    value?: boolean;
    addonsSectionId?: string;
    targetSectionId?: string;
  };
}
export interface AddonPositionState {
  value: boolean;
  addonsSectionId: string;
  targetSectionId: string;
}

export const sliceAddonPositionStart = createSlice<AddonPositionState, AddonPositionAction>({
  name: '@Global',
  initialState: {
    value: false,
    addonsSectionId: '',
    targetSectionId: '',
  },
  reducers: [
    handleAction('setAddonsPositionStart', ({ state, action }) => ({
      value: action.payload.value ?? state.value,
      addonsSectionId: action.payload.addonsSectionId ?? state.addonsSectionId,
      targetSectionId: action.payload.targetSectionId ?? state.targetSectionId,
    })),
  ],
});

export const { setAddonsPositionStart } = sliceAddonPositionStart.actions;
export const useSetAddonsPositionStart = createDispatchAction(setAddonsPositionStart);
export const addonsPositionStartSelector = (state: AppState) => state.builderPage.addonPositionStart;
