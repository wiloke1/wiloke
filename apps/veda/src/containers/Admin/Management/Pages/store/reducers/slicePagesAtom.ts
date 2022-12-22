import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  deletePageAtom,
  getPagesAtom,
  loadMorePagesAtom,
  publishPageAtom,
  hotfixPageAtom,
  enableShopifyPageAtom,
  disableShopifyPageAtom,
} from '../actions/actionPagesAtom';

type ExtraActions = ActionTypes<
  | typeof getPagesAtom
  | typeof loadMorePagesAtom
  | typeof deletePageAtom
  | typeof publishPageAtom
  | typeof hotfixPageAtom
  | typeof enableShopifyPageAtom
  | typeof disableShopifyPageAtom
>;

interface SetModalPublishPage {
  type: 'setModalPublishPage';
  payload: AdminPageDatabase | undefined;
}
interface SetModalHotfixPage {
  type: 'setModalHotfixPage';
  payload: AdminPageDatabase | undefined;
}
type Actions = SetModalPublishPage | SetModalHotfixPage;

interface PageManagerState {
  data: AdminPageDatabase[];
  hasNextPage: boolean;

  getStatus: Status;
  loadMoreStatus: Status;

  modalPublish: AdminPageDatabase | undefined;
  publishStatus: Status;

  modalHotfix: AdminPageDatabase | undefined;
  queueHotfixing: AdminPageDatabase['commandId'][];

  queueDeleting: AdminPageDatabase['commandId'][];

  queueEnabling: AdminPageDatabase['commandId'][];

  queueDisabling: AdminPageDatabase['commandId'][];
}

export const slicePagesAtom = createSlice<PageManagerState, Actions, ExtraActions>({
  name: '@PageManager',
  initialState: {
    data: [],
    getStatus: 'idle',
    loadMoreStatus: 'idle',
    hasNextPage: false,

    queueDeleting: [],

    queueEnabling: [],

    queueDisabling: [],

    modalHotfix: undefined,
    queueHotfixing: [],

    modalPublish: undefined,
    publishStatus: 'idle',
  },
  reducers: [
    handleAction('setModalPublishPage', ({ state, action }) => {
      state.modalPublish = action.payload;
    }),
    handleAction('setModalHotfixPage', ({ state, action }) => {
      state.modalHotfix = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@PageManager/getPagesAtom/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@PageManager/getPagesAtom/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = action.payload.data;
    }),
    handleAction('@PageManager/getPagesAtom/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),

    handleAction('@PageManager/loadMorePagesAtom/request', ({ state }) => {
      state.loadMoreStatus = 'loading';
    }),
    handleAction('@PageManager/loadMorePagesAtom/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = state.data.concat(action.payload.data);
    }),
    handleAction('@PageManager/loadMorePagesAtom/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),
    handleAction('@PageManager/deletePageAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.concat(commandId),
      };
    }),
    handleAction('@PageManager/deletePageAtom/success', ({ state, action }) => {
      const { commandId, onlyShopify } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
        data: onlyShopify ? state.data : state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@PageManager/deletePageAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/publishPageAtom/request', ({ state }) => {
      return {
        ...state,
        publishStatus: 'loading',
      };
    }),
    handleAction('@PageManager/publishPageAtom/success', ({ state }) => {
      return {
        ...state,
        publishStatus: 'success',
      };
    }),
    handleAction('@PageManager/publishPageAtom/failure', ({ state }) => {
      return {
        ...state,
        publishStatus: 'failure',
      };
    }),
    handleAction('@PageManager/hotfixPageAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.concat(commandId),
      };
    }),
    handleAction('@PageManager/hotfixPageAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@PageManager/hotfixPageAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueHotfixing: state.queueHotfixing.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.concat(commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.concat(commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.filter(item => item !== commandId),
      };
    }),
  ],
});
export const { setModalPublishPage, setModalHotfixPage } = slicePagesAtom.actions;

export const useModalPublishPage = createDispatchAction(setModalPublishPage);
export const useModalHotfixPage = createDispatchAction(setModalHotfixPage);

export const pagesAtomSelector = (state: AppState) => state.adminDashboard.pagesAtom;
