import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { renewData } from './actions';

interface State {
  statusRequest: Status;
}

type Actions = ActionTypes<typeof renewData>;

const defaultState: State = {
  statusRequest: 'idle',
};

export const reducerRenewData = createReducer<State, Actions>(defaultState, [
  handleAction('@RenewData/Gồm liquidVariables và default cho các field picker/request', ({ state }) => {
    state.statusRequest = 'loading';
  }),
  handleAction('@RenewData/Gồm liquidVariables và default cho các field picker/success', ({ state }) => {
    state.statusRequest = 'success';
  }),
  handleAction('@RenewData/Gồm liquidVariables và default cho các field picker/failure', ({ state }) => {
    state.statusRequest = 'failure';
  }),
]);
