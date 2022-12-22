import { setSectionArrFieldIndexActive } from 'store/actions/actionSectionArrFieldIndexActive';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type SectionArrFieldIndexActiveAction = ActionTypes<typeof setSectionArrFieldIndexActive>;
type SectionArrFieldIndexActiveState = number;

export const reducerSectionArrFieldIndexActive = createReducer<SectionArrFieldIndexActiveState, SectionArrFieldIndexActiveAction>(-1, [
  handleAction('@Global/setSectionArrFieldIndexActive', ({ action }) => action.payload.index),
]);
