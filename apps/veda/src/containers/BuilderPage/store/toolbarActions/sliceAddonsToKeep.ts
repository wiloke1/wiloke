import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface AddonsToKeepItem {
  label: string;
  addonId: string;
  active: boolean;
  disabled: boolean;
}

export interface SetAddonsToKeepAction {
  type: 'setAddonsToKeep';
  payload: AddonsToKeepItem[];
}

export interface SetAddonsToKeepActiveAction {
  type: 'setAddonsToKeepActive';
  payload: {
    addonId: string;
  };
}

export type AddonsToKeepState = AddonsToKeepItem[];

export const sliceAddonsToKeep = createSlice<AddonsToKeepState, SetAddonsToKeepAction | SetAddonsToKeepActiveAction>({
  name: '@BuilderPage',
  initialState: [],
  reducers: [
    handleAction('setAddonsToKeep', ({ action }) => action.payload),
    handleAction('setAddonsToKeepActive', ({ state, action }) => {
      return state.map(item => {
        return {
          ...item,
          active: item.addonId === action.payload.addonId ? !item.active : item.active,
        };
      });
    }),
  ],
});

export const { setAddonsToKeep, setAddonsToKeepActive } = sliceAddonsToKeep.actions;
export const useSetAddonsToKeep = createDispatchAction(setAddonsToKeep);
export const useSetAddonsToKeepActive = createDispatchAction(setAddonsToKeepActive);
export const addonsToKeepSelector = (state: AppState) => state.builderPage.toolbarActions.addonsToKeep;
