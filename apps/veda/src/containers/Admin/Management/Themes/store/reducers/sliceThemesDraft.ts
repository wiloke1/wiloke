import { DevTheme } from 'types/Theme';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  appendPageToThemeDraft,
  approveThemeDraft,
  commitThemeDraft,
  createThemeDraft,
  deleteThemeDraft,
  forkThemeAtom,
  getThemesDraft,
  loadMoreThemesDraft,
  rejectThemeDraft,
} from '../actions/actionThemesDraft';

type ExtraActions = ActionTypes<
  | typeof approveThemeDraft
  | typeof deleteThemeDraft
  | typeof forkThemeAtom
  | typeof getThemesDraft
  | typeof loadMoreThemesDraft
  | typeof rejectThemeDraft
  | typeof commitThemeDraft
  | typeof createThemeDraft
  | typeof appendPageToThemeDraft
>;

interface SetModalCommitDraft {
  type: 'setModalCommitDraft';
  payload: ThemeManagerState['modalCommitDraft'];
}
interface SetModalRejectDraft {
  type: 'setModalRejectDraft';
  payload: ThemeManagerState['modalRejectDraft'];
}
interface SetModalCreateThemeDraft {
  type: 'setModalCreateThemeDraft';
  payload: boolean;
}
interface SetModalAppendPageToThemeDraft {
  type: 'setModalAppendPageToThemeDraft';
  payload: DevTheme | undefined;
}

type Actions = SetModalCommitDraft | SetModalRejectDraft | SetModalCreateThemeDraft | SetModalAppendPageToThemeDraft;

interface ThemeManagerState {
  data: DevTheme[];
  hasNextPage: boolean;

  getStatus: Status;
  loadMoreStatus: Status;
  queueDeleting: DevTheme['commandId'][];
  queueApproving: DevTheme['commandId'][];
  queueRejecting: DevTheme['commandId'][];
  queueForking: DevTheme['commandId'][];
  queueCommiting: DevTheme['commandId'][];

  modalCommitDraft: DevTheme | undefined;
  modalRejectDraft: DevTheme | undefined;

  modalCreateThemeDraft: boolean;
  createStatus: Status;

  modalAppendPageToThemeDraft: DevTheme | undefined;
  appendPageToThemeDraftStatus: Status;
}

export const sliceThemesDraft = createSlice<ThemeManagerState, Actions, ExtraActions>({
  name: '@ThemeManager',
  initialState: {
    data: [],
    hasNextPage: false,

    getStatus: 'idle',
    loadMoreStatus: 'idle',
    queueApproving: [],
    queueDeleting: [],
    queueForking: [],
    queueRejecting: [],
    queueCommiting: [],
    modalCommitDraft: undefined,
    modalRejectDraft: undefined,

    createStatus: 'idle',
    modalCreateThemeDraft: false,

    appendPageToThemeDraftStatus: 'idle',
    modalAppendPageToThemeDraft: undefined,
  },
  reducers: [
    handleAction('setModalCommitDraft', ({ state, action }) => {
      return {
        ...state,
        modalCommitDraft: action.payload,
      };
    }),
    handleAction('setModalRejectDraft', ({ state, action }) => {
      return {
        ...state,
        modalRejectDraft: action.payload,
      };
    }),
    handleAction('setModalCreateThemeDraft', ({ state, action }) => {
      state.modalCreateThemeDraft = action.payload;
    }),
    handleAction('setModalAppendPageToThemeDraft', ({ state, action }) => {
      state.modalAppendPageToThemeDraft = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@ThemeManager/getThemesDraft/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@ThemeManager/getThemesDraft/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = action.payload.data;
    }),
    handleAction('@ThemeManager/getThemesDraft/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),

    handleAction('@ThemeManager/loadMoreThemesDraft/request', ({ state }) => {
      state.loadMoreStatus = 'loading';
    }),
    handleAction('@ThemeManager/loadMoreThemesDraft/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = state.data.concat(action.payload.data);
    }),
    handleAction('@ThemeManager/loadMoreThemesDraft/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),
    handleAction('@ThemeManager/approveThemeDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/approveThemeDraft/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@ThemeManager/approveThemeDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/rejectThemeDraft/request', ({ state, action }) => {
      const { item } = action.payload;
      const { commandId } = item;
      return {
        ...state,
        queueRejecting: state.queueRejecting.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/rejectThemeDraft/success', ({ state, action }) => {
      const { commandId, newItem } = action.payload;
      return {
        ...state,
        queueRejecting: state.queueRejecting.filter(item => item !== commandId),
        data: state.data.map(item => {
          if (item.commandId === commandId) {
            return newItem;
          }
          return item;
        }),
      };
    }),
    handleAction('@ThemeManager/rejectThemeDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueRejecting: state.queueRejecting.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/deleteThemeDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/deleteThemeDraft/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ThemeManager/deleteThemeDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/forkThemeAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/forkThemeAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/forkThemeAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/commitThemeDraft/request', ({ state, action }) => {
      const { item } = action.payload;
      const { commandId } = item;
      return {
        ...state,
        queueCommiting: state.queueCommiting.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/commitThemeDraft/success', ({ state, action }) => {
      const { commandId, newItem } = action.payload;
      return {
        ...state,
        queueCommiting: state.queueCommiting.filter(item => item !== commandId),
        data: state.data.map(item => {
          if (item.commandId === commandId) {
            return newItem;
          }
          return item;
        }),
      };
    }),
    handleAction('@ThemeManager/commitThemeDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueCommiting: state.queueCommiting.filter(item => item !== commandId),
      };
    }),

    handleAction('@ThemeManager/createThemeDraft/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@ThemeManager/createThemeDraft/success', ({ state, action }) => {
      const { data } = action.payload;
      state.createStatus = 'success';
      state.data = [data, ...state.data];
    }),
    handleAction('@ThemeManager/createThemeDraft/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
    handleAction('@ThemeManager/appendPageToThemeDraft/request', ({ state }) => {
      state.appendPageToThemeDraftStatus = 'loading';
    }),
    handleAction('@ThemeManager/appendPageToThemeDraft/success', ({ state, action }) => {
      const { data } = action.payload;
      state.appendPageToThemeDraftStatus = 'success';
      state.data = state.data.map(item => {
        if (item.commandId === data.commandId) {
          return data;
        }
        return item;
      });
    }),
    handleAction('@ThemeManager/appendPageToThemeDraft/failure', ({ state }) => {
      state.appendPageToThemeDraftStatus = 'failure';
    }),
  ],
});

export const { setModalCommitDraft, setModalRejectDraft, setModalCreateThemeDraft, setModalAppendPageToThemeDraft } = sliceThemesDraft.actions;

export const useSetModalCommitDraft = createDispatchAction(setModalCommitDraft);
export const useSetModalRejectDraft = createDispatchAction(setModalRejectDraft);
export const useSetModalCreateThemeDraft = createDispatchAction(setModalCreateThemeDraft);
export const useSetModalAppendPageToThemeDraft = createDispatchAction(setModalAppendPageToThemeDraft);

export const themesDraftSelector = (state: AppState) => state.adminDashboard.themesDraft;
