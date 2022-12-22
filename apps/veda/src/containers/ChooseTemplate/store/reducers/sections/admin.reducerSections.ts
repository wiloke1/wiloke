import {
  createAdminSectionChangelog,
  deleteAdminSection,
  getAdminSectionChangelog,
  getAdminSections,
  installAdminSection,
  loadMoreAdminSections,
  publishAdminSectionToProduct,
  rejectAdminSection,
  setCurrentAdminSection,
  setSearchKeySectionAtom,
  setSettingsAdminSection,
} from 'containers/ChooseTemplate/store/actions';
import { AdminSection } from 'types/Sections';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type Actions = ActionTypes<
  | typeof getAdminSections
  | typeof deleteAdminSection
  | typeof loadMoreAdminSections
  | typeof setSettingsAdminSection
  | typeof publishAdminSectionToProduct
  | typeof getAdminSectionChangelog
  | typeof createAdminSectionChangelog
  | typeof rejectAdminSection
  | typeof installAdminSection
  | typeof setSearchKeySectionAtom
  | typeof setCurrentAdminSection
>;

interface State {
  data: AdminSection[];
  hasNextPage: boolean;

  getAllStatus: Status;
  loadMoreStatus: Status;
  publishStatus: Status;
  deleteStatus: Record<string, Status>;
  getChangelogStatus: Status;
  createChangelogStatus: Status;
  rejectStatus: Record<string, Status>;
  installStatus: Record<string, Status>;

  visible: boolean;
  sectionId: string;

  searchKey: string;
  currentSection: AdminSection | undefined;
}

export const defaultAdminSectionsState: State = {
  data: [],
  hasNextPage: false,

  getAllStatus: 'idle',
  loadMoreStatus: 'idle',
  publishStatus: 'idle',
  getChangelogStatus: 'idle',
  deleteStatus: {},
  createChangelogStatus: 'idle',
  rejectStatus: {},
  installStatus: {},

  visible: false,
  sectionId: '',
  searchKey: '',
  currentSection: undefined,
};

export const reducerAdminSections = createReducer<State, Actions>(defaultAdminSectionsState, [
  handleAction('@ChooseTemplate/getAdminSections/request', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/getAdminSections/success', ({ state, action }) => {
    return {
      ...state,
      getAllStatus: 'success',
      data: action.payload.data,
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/getAdminSections/failure', ({ state }) => {
    return {
      ...state,
      getAllStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminSections/request', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminSections/success', ({ state, action }) => {
    return {
      ...state,
      loadMoreStatus: 'success',
      data: state.data.concat(action.payload.data),
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@ChooseTemplate/loadMoreAdminSections/failure', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminSection/request', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.section.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminSection/success', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(section => section.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/deleteAdminSection/failure', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/setSettingsAdminSection', ({ state, action }) => {
    return {
      ...state,
      visible: action.payload.visible,
      sectionId: action.payload.sectionId,
    };
  }),
  handleAction('@ChooseTemplate/publishAdminSectionToProduct/request', ({ state }) => {
    return {
      ...state,
      publishStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/publishAdminSectionToProduct/success', ({ state }) => {
    return {
      ...state,
      publishStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/publishAdminSectionToProduct/failure', ({ state }) => {
    return {
      ...state,
      publishStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/getAdminSectionChangelog/request', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/getAdminSectionChangelog/success', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/getAdminSectionChangelog/failure', ({ state }) => {
    return {
      ...state,
      getChangelogStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/createAdminSectionChangelog/request', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'loading',
    };
  }),
  handleAction('@ChooseTemplate/createAdminSectionChangelog/success', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'success',
    };
  }),
  handleAction('@ChooseTemplate/createAdminSectionChangelog/failure', ({ state }) => {
    return {
      ...state,
      createChangelogStatus: 'failure',
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminSection/request', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminSection/success', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'success',
      },
      data: state.data.filter(section => section.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ChooseTemplate/rejectAdminSection/failure', ({ state, action }) => {
    return {
      ...state,
      rejectStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/installAdminSection/request', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ChooseTemplate/installAdminSection/success', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'success',
      },
    };
  }),
  handleAction('@ChooseTemplate/installAdminSection/failure', ({ state, action }) => {
    return {
      ...state,
      installStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
  handleAction('@ChooseTemplate/setSearchKeySectionAtom', ({ state, action }) => {
    state.searchKey = action.payload.searchKey;
  }),
  handleAction('@ChooseTemplate/setCurrentAdminSection', ({ state, action }) => {
    state.currentSection = action.payload.section;
  }),
]);
