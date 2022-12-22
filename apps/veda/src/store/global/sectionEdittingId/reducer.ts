import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { setSectionEdittingId } from './actions';

type SectionEdittingIdAction = ActionTypes<typeof setSectionEdittingId>;
type SectionEdittingIdState = string;

export const reducerSectionEdittingId = createReducer<SectionEdittingIdState, SectionEdittingIdAction>('', [
  handleAction('@Global/setSectionEdittingId', ({ action }) => action.payload.id),
]);
