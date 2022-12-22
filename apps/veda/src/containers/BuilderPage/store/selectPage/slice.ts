import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export type SelectPageState = boolean;
export interface SelectPageAction {
  type: 'setSelectPage';
  payload: boolean;
}

export const sliceSelectPage = createSlice<SelectPageState, SelectPageAction>({
  name: '@BuilderPage',
  initialState: false,
  reducers: [handleAction('setSelectPage', ({ action }) => action.payload)],
});

export const { setSelectPage } = sliceSelectPage.actions;
export const useSetSelectPage = createDispatchAction(setSelectPage);
export const selectPageSelector = (state: AppState) => state.builderPage.selectPage;
