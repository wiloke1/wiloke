import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface SectionIdHoverAction {
  type: 'setSectionIdHover';
  payload: string;
}

type SectionIdHoverState = string;

export const sliceSectionIdHover = createSlice<SectionIdHoverState, SectionIdHoverAction>({
  name: '@Global',
  initialState: '',
  reducers: [handleAction('setSectionIdHover', ({ action }) => action.payload)],
});

export const useSetSectionIdHover = createDispatchAction(sliceSectionIdHover.actions.setSectionIdHover);
export const sectionIdHoverSelector = (state: AppState) => state.global.sectionIdHover;
