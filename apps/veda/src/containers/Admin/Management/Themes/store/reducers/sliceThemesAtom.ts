import { AdminTheme } from 'types/Theme';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  deleteThemeAtom,
  getThemesAtom,
  loadMoreThemesAtom,
  publishThemeAtom,
  hotfixThemeAtom,
  createThemeAtom,
  appendPageToThemeAtom,
} from '../actions/actionThemesAtom';

type ExtraActions = ActionTypes<
  | typeof getThemesAtom
  | typeof loadMoreThemesAtom
  | typeof deleteThemeAtom
  | typeof publishThemeAtom
  | typeof hotfixThemeAtom
  | typeof createThemeAtom
  | typeof appendPageToThemeAtom
>;

interface SetModalPublishThemeAtom {
  type: 'setModalPublishThemeAtom';
  payload: AdminTheme | undefined;
}

interface SetModalCreateThemeAtom {
  type: 'setModalCreateThemeAtom';
  payload: boolean;
}

interface SetModalHotfixThemeAtom {
  type: 'setModalHotfixThemeAtom';
  payload: AdminTheme | undefined;
}

interface SetModalAppendPageToThemeAtom {
  type: 'setModalAppendPageToThemeAtom';
  payload: AdminTheme | undefined;
}

type Actions = SetModalPublishThemeAtom | SetModalCreateThemeAtom | SetModalHotfixThemeAtom | SetModalAppendPageToThemeAtom;

interface ThemeManagerState {
  data: AdminTheme[];
  hasNextPage: boolean;

  getStatus: Status;
  loadMoreStatus: Status;

  modalPublishThemeAtom: AdminTheme | undefined;
  publishStatus: Status;

  modalCreateThemeAtom: boolean;
  createStatus: Status;

  modalAppendPageToThemeAtom: AdminTheme | undefined;
  appendPageToThemeAtomStatus: Status;

  queueDeleting: AdminTheme['commandId'][];

  modalHotfix: AdminTheme | undefined;
  queueHotfixing: AdminTheme['commandId'][];
}

export const sliceThemesAtom = createSlice<ThemeManagerState, Actions, ExtraActions>({
  name: '@ThemeManager',
  initialState: {
    data: [],
    getStatus: 'idle',
    loadMoreStatus: 'idle',
    hasNextPage: false,

    createStatus: 'idle',
    modalCreateThemeAtom: false,

    appendPageToThemeAtomStatus: 'idle',
    modalAppendPageToThemeAtom: undefined,

    modalHotfix: undefined,
    queueHotfixing: [],

    queueDeleting: [],
    modalPublishThemeAtom: undefined,
    publishStatus: 'idle',
  },
  reducers: [
    handleAction('setModalPublishThemeAtom', ({ state, action }) => {
      state.modalPublishThemeAtom = action.payload;
    }),
    handleAction('setModalCreateThemeAtom', ({ state, action }) => {
      state.modalCreateThemeAtom = action.payload;
    }),
    handleAction('setModalHotfixThemeAtom', ({ state, action }) => {
      state.modalHotfix = action.payload;
    }),
    handleAction('setModalAppendPageToThemeAtom', ({ state, action }) => {
      state.modalAppendPageToThemeAtom = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@ThemeManager/getThemesAtom/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@ThemeManager/getThemesAtom/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = action.payload.data;
    }),
    handleAction('@ThemeManager/getThemesAtom/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),

    handleAction('@ThemeManager/loadMoreThemesAtom/request', ({ state }) => {
      state.loadMoreStatus = 'loading';
    }),
    handleAction('@ThemeManager/loadMoreThemesAtom/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = state.data.concat(action.payload.data);
    }),
    handleAction('@ThemeManager/loadMoreThemesAtom/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),
    handleAction('@ThemeManager/createThemeAtom/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@ThemeManager/createThemeAtom/success', ({ state, action }) => {
      const { data } = action.payload;
      state.createStatus = 'success';
      state.data = [data, ...state.data];
    }),
    handleAction('@ThemeManager/createThemeAtom/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
    handleAction('@ThemeManager/appendPageToThemeAtom/request', ({ state }) => {
      state.appendPageToThemeAtomStatus = 'loading';
    }),
    handleAction('@ThemeManager/appendPageToThemeAtom/success', ({ state, action }) => {
      const { data } = action.payload;
      state.appendPageToThemeAtomStatus = 'success';
      state.data = state.data.map(item => {
        if (item.commandId === data.commandId) {
          return data;
        }
        return item;
      });
    }),
    handleAction('@ThemeManager/appendPageToThemeAtom/failure', ({ state }) => {
      state.appendPageToThemeAtomStatus = 'failure';
    }),
    handleAction('@ThemeManager/deleteThemeAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/deleteThemeAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@ThemeManager/deleteThemeAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
      };
    }),
    handleAction('@ThemeManager/publishThemeAtom/request', ({ state }) => {
      return {
        ...state,
        publishStatus: 'loading',
      };
    }),
    handleAction('@ThemeManager/publishThemeAtom/success', ({ state }) => {
      return {
        ...state,
        publishStatus: 'success',
      };
    }),
    handleAction('@ThemeManager/publishThemeAtom/failure', ({ state }) => {
      return {
        ...state,
        publishStatus: 'failure',
      };
    }),
    handleAction('@ThemeManager/hotfixThemeAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.concat(commandId),
      };
    }),
    handleAction('@ThemeManager/hotfixThemeAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@ThemeManager/hotfixThemeAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.filter(item => item !== commandId),
      };
    }),
  ],
});
export const { setModalPublishThemeAtom, setModalCreateThemeAtom, setModalHotfixThemeAtom, setModalAppendPageToThemeAtom } = sliceThemesAtom.actions;

export const useModalPublishThemeAtom = createDispatchAction(setModalPublishThemeAtom);
export const useSetModalCreateThemeAtom = createDispatchAction(setModalCreateThemeAtom);
export const useSetModalHotfixThemeAtom = createDispatchAction(setModalHotfixThemeAtom);
export const useSetModalAppendPageToThemeAtom = createDispatchAction(setModalAppendPageToThemeAtom);

export const themesAtomSelector = (state: AppState) => state.adminDashboard.themesAtom;
