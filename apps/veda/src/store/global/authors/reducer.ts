import { Author } from 'types/Author';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getAuthors, loadmoreAuthors, updateAuthorRole } from './action';

interface State {
  data: Author[];
  getStatus: Status;
  loadmoreStatus: Status;
  queueRequesting: Array<Author['id']>;
  page: number;
  totalPages: number;
  updateRoleStatus: Record<number, Status>;
}

type Actions = ActionTypes<typeof getAuthors | typeof loadmoreAuthors | typeof updateAuthorRole>;

const defaultState: State = {
  data: [],
  getStatus: 'idle',
  loadmoreStatus: 'idle',
  queueRequesting: [],
  page: 0,
  totalPages: 0,
  updateRoleStatus: {},
};

export const reducerAuthors = createReducer<State, Actions>(defaultState, [
  handleAction('@Authors/getAuthorsRequest', ({ state }) => {
    return {
      ...state,
      getStatus: 'loading',
    };
  }),
  handleAction('@Authors/getAuthorsSuccess', ({ state, action }) => {
    const { authors, page, totalPages } = action.payload;
    return {
      ...state,
      getStatus: 'success',
      data: authors,
      page,
      totalPages,
    };
  }),
  handleAction('@Authors/getAuthorsFailure', ({ state }) => {
    return {
      ...state,
      getStatus: 'failure',
    };
  }),
  handleAction('@Authors/loadmoreAuthorsRequest', ({ state }) => {
    return {
      ...state,
      loadmoreStatus: 'loading',
    };
  }),
  handleAction('@Authors/loadmoreAuthorsSuccess', ({ state, action }) => {
    const { authors, page, totalPages } = action.payload;
    return {
      ...state,
      loadmoreStatus: 'success',
      data: state.data.concat(authors),
      page,
      totalPages,
    };
  }),
  handleAction('@Authors/loadmoreAuthorsFailure', ({ state }) => {
    return {
      ...state,
      loadmoreStatus: 'failure',
    };
  }),
  handleAction('@Authors/updateAuthorRole/request', ({ state, action }) => {
    state.updateRoleStatus[action.payload.userId] = 'loading';
  }),
  handleAction('@Authors/updateAuthorRole/success', ({ state, action }) => {
    state.updateRoleStatus[action.payload.userId] = 'success';
  }),
  handleAction('@Authors/updateAuthorRole/failure', ({ state, action }) => {
    state.updateRoleStatus[action.payload.userId] = 'failure';
  }),
]);
