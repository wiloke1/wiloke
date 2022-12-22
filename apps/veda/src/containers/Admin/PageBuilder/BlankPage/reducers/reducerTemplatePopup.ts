import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { actionGetTemplatesPopup, checkCreateBlank, setCurrentTemplateBlank } from '../actions/actionTemplate';
import { deleteTemplatePage } from '../../TemplatesPage/reducers/actions';

type ReducerAction = ActionTypes<
  typeof actionGetTemplatesPopup | typeof setCurrentTemplateBlank | typeof checkCreateBlank | typeof deleteTemplatePage
>;

export interface ReducerState {
  getAllStatus: Status;
  data: ServerTemplateResponse[];
  currentTemplate: undefined | ServerTemplateResponse;
  isCreate: boolean;
  deleteStatus: Record<string, Status>;
}

const defaultState: ReducerState = {
  getAllStatus: 'idle',
  data: [],
  currentTemplate: undefined,
  isCreate: false,
  deleteStatus: {},
};

export const reducerTemplatePopup = createReducer<ReducerState, ReducerAction>(defaultState, [
  handleAction('@BlankPage/getTemplatesRequest', ({ state }) => ({
    ...state,
    getAllStatus: 'loading',
  })),
  handleAction('@BlankPage/getTemplatesSuccess', ({ state, action }) => ({
    ...state,
    getAllStatus: 'success',
    data: action.payload.data,
  })),
  handleAction('@BlankPage/getTemplatesFailure', ({ state }) => ({
    ...state,
    getAllStatus: 'failure',
  })),
  handleAction('@BlankPage/setCurrentTemplateBlank', ({ state, action }) => {
    const { item } = action.payload;
    return {
      ...state,
      currentTemplate: item,
    };
  }),
  handleAction('@BlankPage/checkCreateBlank', ({ state, action }) => {
    const { isCreate } = action.payload;
    return {
      ...state,
      isCreate,
    };
  }),
  handleAction('@PageBuilder/deleteTemplatePage/request', ({ state, action }) => {
    state.deleteStatus[action.payload.commandId] = 'loading';
  }),
  handleAction('@PageBuilder/deleteTemplatePage/success', ({ state, action }) => {
    state.deleteStatus[action.payload.commandId] = 'success';
    state.data = state.data.filter(item => item.commandId !== action.payload.commandId);
  }),
  handleAction('@PageBuilder/deleteTemplatePage/failure', ({ state, action }) => {
    state.deleteStatus[action.payload.commandId] = 'failure';
  }),
]);
