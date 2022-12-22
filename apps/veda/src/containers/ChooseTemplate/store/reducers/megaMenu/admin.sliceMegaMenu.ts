import {
  deleteAdminMegaMenu,
  getAdminMegaMenuChangelog,
  getAdminMegaMenu,
  loadMoreAdminMegaMenu,
  publishAdminMegaMenuToProduct,
  setSettingsAdminMegaMenu,
  createAdminMegaMenuChangelog,
  rejectAdminMegaMenu,
  addAdminMegaMenu,
} from 'containers/ChooseTemplate/store/actions';
import { AdminSection } from 'types/Sections';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type ExtraActions = ActionTypes<
  | typeof deleteAdminMegaMenu
  | typeof getAdminMegaMenuChangelog
  | typeof getAdminMegaMenu
  | typeof loadMoreAdminMegaMenu
  | typeof publishAdminMegaMenuToProduct
  | typeof setSettingsAdminMegaMenu
  | typeof createAdminMegaMenuChangelog
  | typeof rejectAdminMegaMenu
  | typeof addAdminMegaMenu
>;

interface State {
  data: AdminSection[];
  hasNextPage: boolean;

  getAllStatus: Status;
  loadMoreStatus: Status;
  publishStatus: Status;
  deleteStatus: Record<string, Status>;
  rejectStatus: Record<string, Status>;
  addStatus: Record<string, Status>;
  getChangelogStatus: Status;
  createChangelogStatus: Status;

  visible: boolean;
  megaMenuId: string;
}

export const defaultAdminSectionsState: State = {
  data: [],
  hasNextPage: false,

  getAllStatus: 'idle',
  loadMoreStatus: 'idle',
  publishStatus: 'idle',
  getChangelogStatus: 'idle',
  deleteStatus: {},
  rejectStatus: {},
  addStatus: {},
  createChangelogStatus: 'idle',

  visible: false,
  megaMenuId: '',
};

export const sliceAdminMegaMenu = createReducer<State, ExtraActions>(defaultAdminSectionsState, [
  handleAction('@ChooseTemplate/getAdminMegaMenu/request', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/getAdminMegaMenu/success', ({ state, action }) => {
    return {
      ...state,
      getAllStatus: 'success',
      data: action.payload.data,
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/getAdminMegaMenu/failure', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminMegaMenu/request', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminMegaMenu/success', ({ state, action }) => {
    return {
      ...state,
      loadMoreStatus: 'success',
      data: state.data.concat(action.payload.data),
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminMegaMenu/failure', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminMegaMenu/request', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminMegaMenu/success', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(section => section.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminMegaMenu/failure', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/setSettingsAdminMegaMenu', ({ state, action }) => {
    return {
      ...state,
      visible: action.payload.visible,
      megaMenuId: action.payload.megaMenuId,
    };
  }),
  handleAction('@ChooseTemplate/publishAdminMegaMenuToProduct/request', ({ state }) => {
    return {
      ...state,
      publishStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/publishAdminMegaMenuToProduct/success', ({ state }) => {
    return {
      ...state,
      publishStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/publishAdminMegaMenuToProduct/failure', ({ state }) => {
    return {
      ...state,
      publishStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/getAdminMegaMenuChangelog/request', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/getAdminMegaMenuChangelog/success', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/getAdminMegaMenuChangelog/failure', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/createAdminMegaMenuChangelog/request', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/createAdminMegaMenuChangelog/success', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/createAdminMegaMenuChangelog/failure', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminMegaMenu/request', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminMegaMenu/success', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(item => item.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminMegaMenu/failure', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/addAdminMegaMenu/request', ({ state, action }) => {
    return {
      ...state,
      addStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/addAdminMegaMenu/success', ({ state, action }) => {
    return {
      ...state,
      addStatus: {
        [action.payload.commandId]: 'success',
      },
    };
  }),
  handleAction('@ChooseTemplate/addAdminMegaMenu/failure', ({ state, action }) => {
    return {
      ...state,
      addStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
]);
