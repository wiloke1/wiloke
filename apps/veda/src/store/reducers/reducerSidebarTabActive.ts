import { setSidebarTabActive, SidebarTabActiveInput } from 'store/actions/actionSidebarTabActive';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type SidebarTabActiveAction = ActionTypes<typeof setSidebarTabActive>;
type SidebarTabActiveState = SidebarTabActiveInput;

export const reducerSidebarTabActive = createReducer<SidebarTabActiveState, SidebarTabActiveAction>('sections', [
  handleAction('@Global/setSidebarTabActive', ({ action }) => action.payload.tabActive),
]);
