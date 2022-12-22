import { DevSection } from 'types/Sections';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  getDraftMegaMenu,
  deleteDraftMegaMenu,
  loadMoreDraftMegaMenu,
  approveMegaMenuToAdmin,
  forkMegaMenuAdminToDraft,
  rejectDraftMegaMenu,
  addDraftMegaMenu,
} from 'containers/ChooseTemplate/store/actions';

type Actions = any;

type ExtraActions = ActionTypes<
  | typeof getDraftMegaMenu
  | typeof deleteDraftMegaMenu
  | typeof loadMoreDraftMegaMenu
  | typeof approveMegaMenuToAdmin
  | typeof forkMegaMenuAdminToDraft
  | typeof rejectDraftMegaMenu
  | typeof addDraftMegaMenu
>;

interface State {
  data: DevSection[];
  hasNextPage: boolean;

  getAllStatus: Status;
  loadMoreStatus: Status;
  deleteStatus: Record<string, Status>;
  approveStatus: Record<string, Status>;
  addStatus: Record<string, Status>;
  forkStatus: Record<string, Status>;
  rejectStatus: Record<string, Status>;
}

export const defaultDraftMegaMenuState: State = {
  data: [],
  getAllStatus: 'idle',
  loadMoreStatus: 'idle',
  deleteStatus: {},
  approveStatus: {},
  forkStatus: {},
  rejectStatus: {},
  addStatus: {},

  hasNextPage: false,
};

export const sliceDraftMegaMenu = createSlice<State, Actions, ExtraActions>({
  name: '@ChooseTemplate',
  initialState: defaultDraftMegaMenuState,
  reducers: [],
  extraReducers: [
    handleAction('@ChooseTemplate/getDraftMegaMenu/request', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getDraftMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        getAllStatus: 'success',
        data: action.payload.data,
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/getDraftMegaMenu/failure', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreDraftMegaMenu/request', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreDraftMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        loadMoreStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/loadMoreDraftMegaMenu/failure', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/deleteDraftMegaMenu/request', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteDraftMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'success',
        },
        data: state.data.filter(section => section.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/deleteDraftMegaMenu/failure', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/approveMegaMenuToAdmin/request', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/approveMegaMenuToAdmin/success', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'success',
        },
        data: state.data.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/approveMegaMenuToAdmin/failure', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkMegaMenuAdminToDraft/request', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkMegaMenuAdminToDraft/success', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkMegaMenuAdminToDraft/failure', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/rejectDraftMegaMenu/request', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.section.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/rejectDraftMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.commandId]: 'success',
        },
        data: state.data.map(item => {
          if (item.commandId === action.payload.commandId) {
            return {
              ...item,
              status: 'pending',
            };
          }
          return item;
        }),
      };
    }),
    handleAction('@ChooseTemplate/rejectDraftMegaMenu/failure', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/addDraftMegaMenu/request', ({ state, action }) => {
      return {
        ...state,
        addStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/addDraftMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        addStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/addDraftMegaMenu/failure', ({ state, action }) => {
      return {
        ...state,
        addStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
  ],
});
