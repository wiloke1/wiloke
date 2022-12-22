import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateSearchPage,
  actionDeleteSearchPages,
  actionDuplicateSearchPage,
  actionGetSearchPages,
  actionLoadMoreSearchPage,
  actionUpdateStatusSearchPage,
  SetCurrentSearchItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type SearchActions = SetCurrentSearchItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type SearchExtraActions = ActionTypes<
  | typeof actionCreateSearchPage
  | typeof actionDeleteSearchPages
  | typeof actionDuplicateSearchPage
  | typeof actionGetSearchPages
  | typeof actionLoadMoreSearchPage
  | typeof actionUpdateStatusSearchPage
  | typeof updatePageSettings
>;

interface StateSearchPage {
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

export const sliceSearchPage = createSlice<StateSearchPage, SearchActions, SearchExtraActions>({
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
  name: '@SearchPage',
  reducers: [
    handleAction('setCurrentSearchItem', ({ state, action }) => {
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
    handleAction('@SearchPage/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@SearchPage/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@SearchPage/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@SearchPage/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@SearchPage/updateStatusPageSuccess', ({ state, action }) => {
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
    handleAction('@SearchPage/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@SearchPage/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@SearchPage/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: [],
        isSelectAll: false,
      };
    }),
    handleAction('@SearchPage/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
    })),
    handleAction('@SearchPage/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@SearchPage/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@SearchPage/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@SearchPage/duplicateSearchPageRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@SearchPage/duplicateSearchPageSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@SearchPage/duplicateSearchPageFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@SearchPage/LoadMoreSearchPageRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@SearchPage/LoadMoreSearchPageSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@SearchPage/LoadMoreSearchPageFailure', ({ state }) => {
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentSearchItem } = sliceSearchPage.actions;

export const useCreateSearchPage = createDispatchAsyncAction(actionCreateSearchPage);
export const useGetSearchPageItems = createDispatchAsyncAction(actionGetSearchPages);
export const useDeleteSearchPages = createDispatchAsyncAction(actionDeleteSearchPages);
export const useUpdateStatusSearchPage = createDispatchAsyncAction(actionUpdateStatusSearchPage);
export const useLoadMoreSearchPage = createDispatchAsyncAction(actionLoadMoreSearchPage);
export const useDuplicateSearchPage = createDispatchAsyncAction(actionDuplicateSearchPage);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentSearchItem = createDispatchAction(setCurrentSearchItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
