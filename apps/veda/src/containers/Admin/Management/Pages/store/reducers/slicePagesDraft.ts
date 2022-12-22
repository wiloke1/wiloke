import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  approvePageDraft,
  commitPageDraft,
  deletePageDraft,
  forkPageAtom,
  getPagesDraft,
  loadMorePagesDraft,
  rejectPageDraft,
  enableShopifyPageDraft,
  disableShopifyPageDraft,
} from '../actions/actionPagesDraft';

type ExtraActions = ActionTypes<
  | typeof approvePageDraft
  | typeof deletePageDraft
  | typeof forkPageAtom
  | typeof getPagesDraft
  | typeof loadMorePagesDraft
  | typeof rejectPageDraft
  | typeof commitPageDraft
  | typeof enableShopifyPageDraft
  | typeof disableShopifyPageDraft
>;

interface SetModalCommitDraft {
  type: 'setModalCommitDraft';
  payload: PageManagerState['modalCommitDraft'];
}
interface SetModalRejectDraft {
  type: 'setModalRejectDraft';
  payload: PageManagerState['modalRejectDraft'];
}

type Actions = SetModalCommitDraft | SetModalRejectDraft;

interface PageManagerState {
  data: DevPageDatabase[];
  hasNextPage: boolean;

  getStatus: Status;
  loadMoreStatus: Status;
  queueDeleting: DevPageDatabase['commandId'][];
  queueApproving: DevPageDatabase['commandId'][];
  queueRejecting: DevPageDatabase['commandId'][];
  queueForking: DevPageDatabase['commandId'][];
  queueCommiting: DevPageDatabase['commandId'][];

  modalCommitDraft: DevPageDatabase | undefined;
  modalRejectDraft: DevPageDatabase | undefined;

  queueEnabling: DevPageDatabase['commandId'][];

  queueDisabling: DevPageDatabase['commandId'][];
}

export const slicePagesDraft = createSlice<PageManagerState, Actions, ExtraActions>({
  name: '@PageManager',
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

    queueEnabling: [],

    queueDisabling: [],
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
  ],
  extraReducers: [
    handleAction('@PageManager/getPagesDraft/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@PageManager/getPagesDraft/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = action.payload.data;
    }),
    handleAction('@PageManager/getPagesDraft/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),

    handleAction('@PageManager/loadMorePagesDraft/request', ({ state }) => {
      state.loadMoreStatus = 'loading';
    }),
    handleAction('@PageManager/loadMorePagesDraft/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.hasNextPage = action.payload.hasNextPage;
      state.data = state.data.concat(action.payload.data);
    }),
    handleAction('@PageManager/loadMorePagesDraft/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),
    handleAction('@PageManager/approvePageDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.concat(commandId),
      };
    }),
    handleAction('@PageManager/approvePageDraft/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.filter(item => item !== commandId),
        data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@PageManager/approvePageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueApproving: state.queueApproving.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/rejectPageDraft/request', ({ state, action }) => {
      const { item } = action.payload;
      const { commandId } = item;
      return {
        ...state,
        queueRejecting: state.queueRejecting.concat(commandId),
      };
    }),
    handleAction('@PageManager/rejectPageDraft/success', ({ state, action }) => {
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
    handleAction('@PageManager/rejectPageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueRejecting: state.queueRejecting.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/deletePageDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.concat(commandId),
      };
    }),
    handleAction('@PageManager/deletePageDraft/success', ({ state, action }) => {
      const { commandId, onlyShopify } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
        data: onlyShopify ? state.data : state.data.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@PageManager/deletePageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/forkPageAtom/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.concat(commandId),
      };
    }),
    handleAction('@PageManager/forkPageAtom/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/forkPageAtom/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueForking: state.queueForking.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/commitPageDraft/request', ({ state, action }) => {
      const { item } = action.payload;
      const { commandId } = item;
      return {
        ...state,
        queueCommiting: state.queueCommiting.concat(commandId),
      };
    }),
    handleAction('@PageManager/commitPageDraft/success', ({ state, action }) => {
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
    handleAction('@PageManager/commitPageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueCommiting: state.queueCommiting.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.concat(commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageDraft/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.filter(item => item !== commandId),
        // data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@PageManager/enableShopifyPageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueEnabling: state.queueEnabling.filter(item => item !== commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageDraft/request', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.concat(commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageDraft/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.filter(item => item !== commandId),
        // data: state.data.filter(item => item.commandId !== commandId),
      };
    }),
    handleAction('@PageManager/disableShopifyPageDraft/failure', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        queueDisabling: state.queueDisabling.filter(item => item !== commandId),
      };
    }),
  ],
});

export const { setModalCommitDraft, setModalRejectDraft } = slicePagesDraft.actions;

export const useSetModalCommitDraft = createDispatchAction(setModalCommitDraft);
export const useSetModalRejectDraft = createDispatchAction(setModalRejectDraft);

export const pagesDraftSelector = (state: AppState) => state.adminDashboard.pagesDraft;
