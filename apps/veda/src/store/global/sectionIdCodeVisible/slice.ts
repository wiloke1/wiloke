import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface CodeVisibleAction {
  type: 'setSectionIdCodeVisible';
  payload: {
    sectionId: string;
  };
}
type CodeVisibleState = string;

export const sliceSectionIdCodeVisible = createSlice<CodeVisibleState, CodeVisibleAction>({
  name: '@Global',
  initialState: '',
  reducers: [handleAction('setSectionIdCodeVisible', ({ action }) => action.payload.sectionId)],
});

export const useSetSectionIdCodeVisible = createDispatchAction(sliceSectionIdCodeVisible.actions.setSectionIdCodeVisible);
