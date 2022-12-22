import { ActionTypes, handleAction, createReducer } from 'wiloke-react-core/utils';
import { setIdClickActive, setIdHoverActive } from '../actions/actionSectionToolbar';

interface State {
  idClickActive: string;
  idHoverActive: string;
}

type Actions = ActionTypes<typeof setIdClickActive | typeof setIdHoverActive>;

const defaultState: State = {
  idClickActive: '',
  idHoverActive: '',
};

export const reducerSectionToolbar = createReducer<State, Actions>(defaultState, [
  handleAction('@SectionToolbar/setIdClickActive', ({ state, action }) => {
    const { idClickActive } = action.payload;
    return {
      ...state,
      idClickActive,
    };
  }),
  handleAction('@SectionToolbar/setIdHoverActive', ({ state, action }) => {
    const { idHoverActive } = action.payload;
    return {
      ...state,
      idHoverActive,
    };
  }),
]);
