import { FilterTypePage, AdminPageData } from 'containers/Admin/types';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { updatePageSettings } from '../../DashboardPageSettings';
import {
  actionCreateBlankPage,
  actionDeleteBlankPages,
  actionDuplicateBlankPage,
  actionFilterPageType,
  actionGetBlankPages,
  actionIsSelectAll,
  actionLoadMoreBlankPage,
  actionSelectManyItems,
  actionUpdateStatusBlankPage,
  changSearchKey,
  setCurrentBlankItem,
} from '../actions';

type ActionBlankPage = ActionTypes<
  | typeof actionSelectManyItems
  | typeof actionCreateBlankPage
  | typeof actionUpdateStatusBlankPage
  | typeof actionDeleteBlankPages
  | typeof actionGetBlankPages
  | typeof actionFilterPageType
  | typeof actionIsSelectAll
  | typeof actionDuplicateBlankPage
  | typeof changSearchKey
  | typeof setCurrentBlankItem
  | typeof actionLoadMoreBlankPage
  | typeof updatePageSettings
>;

interface StateBlankPage {
  ids: string[];
  data: AdminPageData[];
  currentItem: AdminPageData | undefined;
  getAllPageStatus: Status;
  loadMorePageStatus: Status;
  createPageStatus: Status;
  duplicateStatus: {
    [parentId: string]: Status;
  };
  updatePageStatus: {
    [id: string]: Status;
  };
  deletePending: string[];
  filterType: FilterTypePage;
  isSelectAll: boolean;
  search: string;
  hasNextPage: boolean;
}

const defaultState: StateBlankPage = {
  ids: [],
  data: [],
  getAllPageStatus: 'idle',
  createPageStatus: 'idle',
  updatePageStatus: {},
  loadMorePageStatus: 'idle',
  deletePending: [],
  duplicateStatus: {},
  filterType: 'all',
  isSelectAll: false,
  search: '',
  currentItem: undefined,
  hasNextPage: false,
};

export const reducerBlankPage = createReducer<StateBlankPage, ActionBlankPage>(defaultState, [
  handleAction('@BlankPage/selectIds', ({ state, action }) => {
    const { ids } = action.payload;
    return {
      ...state,
      ids,
    };
  }),
  handleAction('@BlankPage/createPageRequest', ({ state }) => ({
    ...state,
    createPageStatus: 'loading',
  })),
  handleAction('@BlankPage/createPageSuccess', ({ state }) => {
    return {
      ...state,
      createPageStatus: 'success',
    };
  }),
  handleAction('@BlankPage/createPageFailure', ({ state }) => ({
    ...state,
    createPageStatus: 'failure',
  })),
  handleAction('@BlankPage/updateStatusPageRequest', ({ state, action }) => ({
    ...state,
    updatePageStatus: {
      ...state.updatePageStatus,
      [action.payload.id]: 'loading',
    },
  })),
  handleAction('@BlankPage/updateStatusPageSuccess', ({ state, action }) => {
    const { enable, id, justDisabledPages, modifiedDateTimestamp } = action.payload;

    return {
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [id]: 'success',
      },
      data: state.data.map(item => {
        if (item.commandId === id) {
          return {
            ...item,
            enable: enable,
            modifiedDateTimestamp,
          };
        }
        if (Array.isArray(justDisabledPages) && justDisabledPages.includes(item.commandId)) {
          return {
            ...item,
            enable: false,
          };
        }
        return item;
      }),
    };
  }),
  handleAction('@BlankPage/updateStatusPageFailure', ({ state, action }) => ({
    ...state,
    updatePageStatus: {
      ...state.updatePageStatus,
      [action.payload.id]: 'failure',
    },
  })),
  handleAction('@BlankPage/deletePagesRequest', ({ state }) => ({
    ...state,
    deletePending: state.ids,
  })),
  handleAction('@BlankPage/deletePagesSuccess', ({ state, action }) => {
    return {
      ...state,
      data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
      deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
      ids: state.ids.filter(id => !action.payload.ids.includes(id)),
      isSelectAll: false,
    };
  }),
  handleAction('@BlankPage/deletePagesFailure', ({ state, action }) => ({
    ...state,
    deletePending: state.deletePending.filter(id => id !== action.payload.id),
    ids: state.ids.filter(id => id !== action.payload.id),
  })),
  handleAction('@BlankPage/getPagesRequest', ({ state }) => ({
    ...state,
    getAllPageStatus: 'loading',
    isSelectAll: false,
    ids: [],
  })),
  handleAction('@BlankPage/getPagesSuccess', ({ state, action }) => {
    const { data } = action.payload;

    return {
      ...state,
      getAllPageStatus: 'success',
      data,
      hasNextPage: data.length > 0 ? true : false,
    };
  }),
  handleAction('@BlankPage/getPagesFailure', ({ state }) => ({
    ...state,
    getAllPageStatus: 'failure',
  })),
  handleAction('@BlankPage/FilterPageType', ({ state, action }) => ({
    ...state,
    filterType: action.payload.pageType,
  })),
  handleAction('@BlankPage/isSelectAll', ({ state, action }) => ({
    ...state,
    isSelectAll: action.payload.isSelectAll,
  })),
  handleAction('@BlankPage/duplicateBlankPageRequest', ({ state, action }) => ({
    ...state,
    duplicateStatus: {
      [action.payload.id]: 'loading',
    },
  })),
  handleAction('@BlankPage/duplicateBlankPageSuccess', ({ state, action }) => ({
    ...state,
    duplicateStatus: {
      [action.payload.parentId]: 'success',
    },
    data: [action.payload.item, ...state.data],
  })),
  handleAction('@BlankPage/duplicateBlankPageFailure', ({ state, action }) => ({
    ...state,
    duplicateStatus: {
      [action.payload.parentId]: 'failure',
    },
  })),
  handleAction('@BlankPage/changSearchKey', ({ state, action }) => {
    state.search = action.payload.search;
  }),
  handleAction('@BlankPage/setCurrentBlankItem', ({ state, action }) => {
    state.currentItem = action.payload.item;
  }),
  handleAction('@BlankPage/LoadMoreBlankPageRequest', ({ state }) => {
    return {
      ...state,
      loadMorePageStatus: 'loading',
    };
  }),
  handleAction('@BlankPage/LoadMoreBlankPageSuccess', ({ state, action }) => {
    return {
      ...state,
      loadMorePageStatus: 'success',
      data: state.data.concat(action.payload.data),
      hasNextPage: action.payload.hasNextPage,
    };
  }),
  handleAction('@BlankPage/LoadMoreBlankPageFailure', ({ state }) => {
    return {
      ...state,
      loadMorePageStatus: 'failure',
    };
  }),

  handleAction('@Dashboard/updatePageSettings/success', ({ state, action }) => {
    return {
      ...state,
      data: state.data.map(item => {
        if (item.commandId === action.payload.commandId) {
          return {
            ...item,
            label: action.payload.pageSettings?.generalSettings.label ?? '',
            handle: action.payload.pageSettings?.generalSettings.handle ?? '',
            pageSettings: action.payload.pageSettings,
          };
        }
        return item;
      }),
    };
  }),
]);
