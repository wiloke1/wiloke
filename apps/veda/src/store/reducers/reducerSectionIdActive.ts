import { setSectionIdActive } from 'store/actions/actionSectionIdActive';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type SectionIdActiveAction = ActionTypes<typeof setSectionIdActive>;
type SectionIdActiveState = string;

export const reducerSectionIdActive = createReducer<SectionIdActiveState, SectionIdActiveAction>('', [
  handleAction('@Global/setSectionIdActive', ({ action }) => action.payload.id),
]);
