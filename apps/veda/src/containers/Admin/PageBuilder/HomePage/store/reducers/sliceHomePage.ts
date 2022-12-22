import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateHomePage,
  actionDeleteHomePages,
  actionDuplicateHomePage,
  actionGetHomePages,
  actionLoadMoreHomePage,
  actionUpdateStatusHomePage,
  SetCurrentHomeItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type HomeActions = SetCurrentHomeItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type HomeExtraActions = ActionTypes<
  | typeof actionCreateHomePage
  | typeof actionDeleteHomePages
  | typeof actionDuplicateHomePage
  | typeof actionGetHomePages
  | typeof actionLoadMoreHomePage
  | typeof actionUpdateStatusHomePage
  | typeof updatePageSettings
>;

interface StateHomePage {
  ids: string[];
  data: AdminPageData[];
  currentItem: AdminPageData | undefined;
  getAllPageStatus: Status;
  loadMorePageStatus: Status;
  createPageStatus: Status;
  duplicateStatus: RecordStatus;
  updatePageStatus: RecordStatus;
  deletePending: string[];
  hasNextPage: boolean;
  filterType: FilterTypePage;
  isSelectAll: boolean;
  search: string;
}

export const sliceHomePage = createSlice<StateHomePage, HomeActions, HomeExtraActions>({
  initialState: {
    data: [],
    ids: [],
    isSelectAll: false,
    createPageStatus: 'idle',
    duplicateStatus: {},
    deletePending: [],
    getAllPageStatus: 'idle',
    updatePageStatus: {},
    loadMorePageStatus: 'idle',
    currentItem: undefined,
    filterType: 'all',
    search: '',
    hasNextPage: false,
  },
  name: '@HomePage',
  reducers: [
    handleAction('setCurrentHomeItem', ({ state, action }) => {
      const { item } = action.payload;
      state.currentItem = item;
    }),
    handleAction('selectIds', ({ state, action }) => {
      const { ids } = action.payload;
      return {
        ...state,
        ids,
      };
    }),
    handleAction('filterPageType', ({ state, action }) => ({
      ...state,
      filterType: action.payload.pageType,
    })),
    handleAction('isSelectAll', ({ state, action }) => ({
      ...state,
      isSelectAll: action.payload.isSelectAll,
    })),
    handleAction('changSearchKey', ({ state, action }) => {
      state.search = action.payload.search;
    }),
  ],
  extraReducers: [
    handleAction('@HomePage/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@HomePage/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@HomePage/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@HomePage/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@HomePage/updateStatusPageSuccess', ({ state, action }) => {
      const { enable, id, modifiedDateTimestamp } = action.payload;

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
          return {
            ...item,
            enable: false,
          };
        }),
      };
    }),
    handleAction('@HomePage/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@HomePage/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@HomePage/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: [],
        isSelectAll: false,
      };
    }),
    handleAction('@HomePage/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
    })),
    handleAction('@HomePage/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@HomePage/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@HomePage/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@HomePage/duplicateHomePageRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@HomePage/duplicateHomePageSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@HomePage/duplicateHomePageFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@HomePage/LoadMoreHomePageRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@HomePage/LoadMoreHomePageSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@HomePage/LoadMoreHomePageFailure', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'failure',
      };
    }),
    handleAction('@Dashboard/updatePageSettings/success', ({ state, action }) => {
      const { commandId } = action.payload;
      return {
        ...state,
        data: state.data.map(item => {
          if (item.commandId === commandId) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    }),
  ],
});

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentHomeItem } = sliceHomePage.actions;

export const useCreateHomePage = createDispatchAsyncAction(actionCreateHomePage);
export const useGetHomePageItems = createDispatchAsyncAction(actionGetHomePages);
export const useDeleteHomePages = createDispatchAsyncAction(actionDeleteHomePages);
export const useUpdateStatusHomePage = createDispatchAsyncAction(actionUpdateStatusHomePage);
export const useLoadMoreHomePage = createDispatchAsyncAction(actionLoadMoreHomePage);
export const useDuplicateHomePage = createDispatchAsyncAction(actionDuplicateHomePage);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentHomeItem = createDispatchAction(setCurrentHomeItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
