import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface ModalDeleteVisibleState {
  visible: boolean;
  sectionId: string;
}

export interface ModalDeleteVisibleAction {
  type: 'setModalDeleteVisible';
  payload: ModalDeleteVisibleState;
}

export const sliceModalDeleteVisible = createSlice<ModalDeleteVisibleState, ModalDeleteVisibleAction>({
  name: '@BuilderPage',
  initialState: {
    visible: false,
    sectionId: '',
  },
  reducers: [handleAction('setModalDeleteVisible', ({ action }) => action.payload)],
});

export const { setModalDeleteVisible } = sliceModalDeleteVisible.actions;
export const useSetModalDeleteVisible = createDispatchAction(setModalDeleteVisible);
export const modalDeleteVisibleSelector = (state: AppState) => state.builderPage.toolbarActions.modalDeleteVisible;
