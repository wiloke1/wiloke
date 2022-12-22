import { setModalSettingsOk } from 'store/actions/actionModalSettingsOk';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type ModalSettingsOkAction = ActionTypes<typeof setModalSettingsOk>;
type ModalSettingsOkState = boolean;

export const reducerModalSettingsOk = createReducer<ModalSettingsOkState, ModalSettingsOkAction>(true, [
  handleAction('@Global/setModalSettingsOk', ({ action }) => action.payload.value),
]);
