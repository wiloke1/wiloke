import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface ReorderFieldsAction {
  type: 'reorderFields';
  payload: boolean;
}
type ReorderFieldsState = boolean;

export const sliceAllowReorderingFields = createSlice<ReorderFieldsState, ReorderFieldsAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('reorderFields', ({ action }) => action.payload)],
});

export const { reorderFields } = sliceAllowReorderingFields.actions;
export const useReorderFields = createDispatchAction(reorderFields);
