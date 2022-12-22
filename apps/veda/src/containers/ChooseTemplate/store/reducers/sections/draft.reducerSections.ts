import {
  getDraftSections,
  deleteDraftSection,
  loadMoreDraftSections,
  approveSectionToAdmin,
  forkSectionAdminToDraft,
  rejectDraftSection,
  installDraftSection,
  setSearchKeyDraftSection,
} from 'containers/ChooseTemplate/store/actions';
import { DevSection } from 'types/Sections';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type Actions = ActionTypes<
  | typeof getDraftSections
  | typeof deleteDraftSection
  | typeof loadMoreDraftSections
  | typeof approveSectionToAdmin
  | typeof forkSectionAdminToDraft
  | typeof rejectDraftSection
  | typeof installDraftSection
  | typeof setSearchKeyDraftSection
>;

interface State {
  data: DevSection[];
  hasNextPage: boolean;
  searchKey: string;

  getAllStatus: Status;
  loadMoreStatus: Status;
  deleteStatus: Record<string, Status>;
  approveStatus: Record<string, Status>;
  forkStatus: Record<string, Status>;
  rejectStatus: Record<string, Status>;
  installStatus: Record<string, Status>;
}

export const defaultDraftSectionsState: State = {
  data: [],
  getAllStatus: 'idle',
  loadMoreStatus: 'idle',
  deleteStatus: {},
  approveStatus: {},
  forkStatus: {},
  rejectStatus: {},
  installStatus: {},

  hasNextPage: false,
  searchKey: '',
};

export const reducerDraftSections = createReducer<State, Actions>(defaultDraftSectionsState, [
  handleAction('@ChooseTemplate/getDraftSections/request', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/getDraftSections/success', ({ state, action }) => {
    return {
      ...state,
      getAllStatus: 'success',
      data: action.payload.data,
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/getDraftSections/failure', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreDraftSections/request', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreDraftSections/success', ({ state, action }) => {
    return {
      ...state,
      loadMoreStatus: 'success',
      data: state.data.concat(action.payload.data),
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/loadMoreDraftSections/failure', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/deleteDraftSection/request', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.section.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/deleteDraftSection/success', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(section => section.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/deleteDraftSection/failure', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/approveSectionToAdmin/request', ({ state, action }) => {
    return {
      ...state,
      approveStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/approveSectionToAdmin/success', ({ state, action }) => {
    return {
      ...state,
      approveStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(item => item.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/approveSectionToAdmin/failure', ({ state, action }) => {
    return {
      ...state,
      approveStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/forkSectionAdminToDraft/request', ({ state, action }) => {
    return {
      ...state,
      forkStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/forkSectionAdminToDraft/success', ({ state, action }) => {
    return {
      ...state,
      forkStatus: {
        [action.payload.commandId]: 'success',
      },
    };
  }),
  handleAction('@ChooseTemplate/forkSectionAdminToDraft/failure', ({ state, action }) => {
    return {
      ...state,
      forkStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/rejectDraftSection/request', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.section.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/rejectDraftSection/success', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'loading',
      },
      data: state.data.filter(item => item.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/rejectDraftSection/failure', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/installDraftSection/request', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/installDraftSection/success', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'success',
      },
    };
  }),
  handleAction('@ChooseTemplate/installDraftSection/failure', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/setSearchKeyDraftSection', ({ state, action }) => {
    state.searchKey = action.payload.searchKey;
  }),
]);
