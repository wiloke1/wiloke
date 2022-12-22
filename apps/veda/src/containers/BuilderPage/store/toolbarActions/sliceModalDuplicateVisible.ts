import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface ModalDuplicateVisibleState {
  visible: boolean;
  sectionId: string;
}

export interface ModalDuplicateVisibleAction {
  type: 'setModalDuplicateVisible';
  payload: ModalDuplicateVisibleState;
}

export const sliceModalDuplicateVisible = createSlice<ModalDuplicateVisibleState, ModalDuplicateVisibleAction>({
  name: '@BuilderPage',
  initialState: {
    visible: false,
    sectionId: '',
  },
  reducers: [handleAction('setModalDuplicateVisible', ({ action }) => action.payload)],
});

export const { setModalDuplicateVisible } = sliceModalDuplicateVisible.actions;
export const useSetModalDuplicateVisible = createDispatchAction(setModalDuplicateVisible);
export const modalDuplicateVisibleSelector = (state: AppState) => state.builderPage.toolbarActions.modalDuplicateVisible;
