import {
  deleteDraftAddons,
  addDraftAddon,
  getDraftAddons,
  loadMoreDraftAddons,
  approveAddonToAdmin,
  forkAddonAdminToDraft,
  rejectDraftAddon,
} from 'containers/ChooseTemplate/store/actions';
import { DevAddon } from 'types/Addons';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';

type AddonId = string;

type DraftAddonsExtraActions = ActionTypes<
  | typeof deleteDraftAddons
  | typeof addDraftAddon
  | typeof getDraftAddons
  | typeof loadMoreDraftAddons
  | typeof approveAddonToAdmin
  | typeof forkAddonAdminToDraft
  | typeof rejectDraftAddon
>;

type DraftAddonsActions = any;

export interface AddonState {
  addons: DevAddon[];
  deleteStatus: Record<AddonId, Status>;
  getAddonsStatus: Status;
  addAddonStatus: Record<AddonId, Status>;
  loadMoreStatus: Status;
  approveStatus: Record<AddonId, Status>;
  forkStatus: Record<string, Status>;
  rejectStatus: Record<string, Status>;

  hasNextPage: boolean;
  searchKey: string;
}

export const sliceDraftAddons = createSlice<AddonState, DraftAddonsActions, DraftAddonsExtraActions>({
  initialState: {
    addons: [],
    addAddonStatus: {},
    deleteStatus: {},
    getAddonsStatus: 'idle',
    loadMoreStatus: 'idle',
    approveStatus: {},
    forkStatus: {},
    rejectStatus: {},

    hasNextPage: false,
    searchKey: '',
  },
  name: '@ChooseTemplate',
  reducers: [],
  extraReducers: [
    // get addons by cate id
    handleAction('@ChooseTemplate/getDraftAddons/request', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getDraftAddons/success', ({ state, action }) => {
      return {
        ...state,
        getAddonsStatus: 'success',
        addons: action.payload.data,
        hasNextPage: action.payload.data.length > 0 ? true : false,
      };
    }),
    handleAction('@ChooseTemplate/getDraftAddons/failure', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'failure',
      };
    }),

    // add addons
    handleAction('@ChooseTemplate/addDraftAddons/request', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/addDraftAddons/success', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.map(item => {
          if (item.commandId === action.payload.commandId) {
            return {
              ...item,
              saved: true,
            };
          }
          return item;
        }),
      };
    }),
    handleAction('@ChooseTemplate/addDraftAddons/failure', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),

    // delete addons
    handleAction('@ChooseTemplate/deleteDraftAddons/request', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteDraftAddons/success', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/deleteDraftAddons/failure', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),

    // load more
    handleAction('@ChooseTemplate/loadMoreDraftAddons/request', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreDraftAddons/success', ({ state, action }) => {
      return {
        ...state,
        loadMoreStatus: 'success',
        addons: state.addons.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/loadMoreDraftAddons/failure', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'failure',
      };
    }),

    // approve
    handleAction('@ChooseTemplate/approveAddonToAdmin/request', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/approveAddonToAdmin/success', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/approveAddonToAdmin/failure', ({ state, action }) => {
      return {
        ...state,
        approveStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkAddonAdminToDraft/request', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkAddonAdminToDraft/success', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/forkAddonAdminToDraft/failure', ({ state, action }) => {
      return {
        ...state,
        forkStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/rejectDraftAddon/request', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.devAddon.commandId ?? '']: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/rejectDraftAddon/success', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.map(item => {
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
    handleAction('@ChooseTemplate/rejectDraftAddon/failure', ({ state, action }) => {
      return {
        ...state,
        rejectStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
  ],
});
