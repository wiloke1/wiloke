import {
  deleteAdminAddons,
  getAdminAddons,
  loadMoreAdminAddons,
  publishAdminAddonsToProduct,
  rejectAdminAddon,
  installAdminAddon,
  createAdminAddonChangelog,
} from 'containers/ChooseTemplate/store/actions';
import { AdminAddon } from 'types/Addons';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type AddonId = string;

type AdminAddonsExtraActions = ActionTypes<
  | typeof deleteAdminAddons
  | typeof getAdminAddons
  | typeof loadMoreAdminAddons
  | typeof publishAdminAddonsToProduct
  | typeof rejectAdminAddon
  | typeof installAdminAddon
  | typeof createAdminAddonChangelog
>;

type AdminAddonsActions =
  | {
      type: 'setModalPublishAddons';
      payload: {
        addonId: string;
        visible: boolean;
      };
    }
  | {
      type: 'setCurrentAdminAddon';
      payload: AdminAddon | undefined;
    };

export interface AddonState {
  addons: AdminAddon[];

  deleteStatus: Record<AddonId, Status>;
  getAddonsStatus: Status;
  rejectAddonStatus: Record<AddonId, Status>;
  loadMoreStatus: Status;
  approveStatus: Status;
  installAddonStatus: Record<AddonId, Status>;
  createChangelogStatus: Status;

  hasNextPage: boolean;
  searchKey: string;
  visible: boolean;
  addonId: string;
  currentAddon: AdminAddon | undefined;
}

export const sliceAdminAddons = createSlice<AddonState, AdminAddonsActions, AdminAddonsExtraActions>({
  initialState: {
    addons: [],
    deleteStatus: {},
    installAddonStatus: {},
    rejectAddonStatus: {},
    getAddonsStatus: 'idle',
    loadMoreStatus: 'idle',
    approveStatus: 'idle',
    createChangelogStatus: 'idle',

    hasNextPage: false,
    searchKey: '',

    visible: false,
    addonId: '',
    currentAddon: undefined,
  },
  name: '@ChooseTemplate',
  reducers: [
    handleAction('setModalPublishAddons', ({ state, action }) => {
      state.visible = action.payload.visible;
      state.addonId = action.payload.addonId;
    }),
    handleAction('setCurrentAdminAddon', ({ state, action }) => {
      state.currentAddon = action.payload;
    }),
  ],
  extraReducers: [
    // get addons by cate id
    handleAction('@ChooseTemplate/getAdminAddons/request', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getAdminAddons/success', ({ state, action }) => {
      return {
        ...state,
        getAddonsStatus: 'success',
        addons: action.payload.data,
        hasNextPage: action.payload.data.length > 0 ? true : false,
      };
    }),
    handleAction('@ChooseTemplate/getAdminAddons/failure', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'failure',
      };
    }),

    // delete addons
    handleAction('@ChooseTemplate/deleteAdminAddons/request', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteAdminAddons/success', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/deleteAdminAddons/failure', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),

    // load more
    handleAction('@ChooseTemplate/loadMoreAdminAddons/request', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreAdminAddons/success', ({ state, action }) => {
      return {
        ...state,
        loadMoreStatus: 'success',
        addons: state.addons.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/loadMoreAdminAddons/failure', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/publishAdminAddonsToProduct/request', ({ state }) => {
      return {
        ...state,
        approveStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/publishAdminAddonsToProduct/success', ({ state }) => {
      return {
        ...state,
        approveStatus: 'success',
      };
    }),
    handleAction('@ChooseTemplate/publishAdminAddonsToProduct/failure', ({ state }) => {
      return {
        ...state,
        approveStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/rejectAdminAddon/request', ({ state, action }) => {
      return {
        ...state,
        rejectAddonStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/rejectAdminAddon/success', ({ state, action }) => {
      return {
        ...state,
        rejectAddonStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/rejectAdminAddon/failure', ({ state, action }) => {
      return {
        ...state,
        rejectAddonStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/installAdminAddon/request', ({ state, action }) => {
      return {
        ...state,
        installAddonStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/installAdminAddon/success', ({ state, action }) => {
      return {
        ...state,
        installAddonStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/installAdminAddon/failure', ({ state, action }) => {
      return {
        ...state,
        installAddonStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonChangelog/request', ({ state }) => {
      return {
        ...state,
        createChangelogStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonChangelog/success', ({ state }) => {
      return {
        ...state,
        createChangelogStatus: 'success',
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonChangelog/failure', ({ state }) => {
      return {
        ...state,
        createChangelogStatus: 'failure',
      };
    }),
  ],
});

export const { setModalPublishAddons, setCurrentAdminAddon } = sliceAdminAddons.actions;

export const useSetModalPublishAddons = createDispatchAction(setModalPublishAddons);
export const useSetCurrentAdminAddon = createDispatchAction(setCurrentAdminAddon);
