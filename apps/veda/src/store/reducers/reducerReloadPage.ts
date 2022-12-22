import { setReloadPage } from 'store/actions/actionReloadPage';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type ReloadPageAction = ActionTypes<typeof setReloadPage>;
type ReloadPageState = boolean;

export const reducerReloadPage = createReducer<ReloadPageState, ReloadPageAction>(false, [
  handleAction('@Global/setReloadPage', ({ action }) => action.payload.value),
]);
