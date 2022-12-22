import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateCollectionPage,
  actionDeleteCollectionPages,
  actionDuplicateCollectionPage,
  actionGetCollectionPages,
  actionLoadMoreCollectionPage,
  actionUpdateStatusCollectionPage,
  SetCurrentCollectionItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type CollectionActions = SetCurrentCollectionItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type CollectionExtraActions = ActionTypes<
  | typeof actionCreateCollectionPage
  | typeof actionDeleteCollectionPages
  | typeof actionDuplicateCollectionPage
  | typeof actionGetCollectionPages
  | typeof actionLoadMoreCollectionPage
  | typeof actionUpdateStatusCollectionPage
  | typeof updatePageSettings
>;

interface StateCollectionPage {
  ids: string[];
  data: AdminPageData[];
  currentItem: AdminPageData | undefined;
  getAllPageStatus: Status;
  loadMorePageStatus: Status;
  createPageStatus: Status;
  duplicateStatus: RecordStatus;
  updatePageStatus: RecordStatus;
  deletePending: string[];
  filterType: FilterTypePage;
  isSelectAll: boolean;
  search: string;
  hasNextPage: boolean;
}

export const sliceCollectionPage = createSlice<StateCollectionPage, CollectionActions, CollectionExtraActions>({
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
  name: '@CollectionPage',
  reducers: [
    handleAction('setCurrentCollectionItem', ({ state, action }) => {
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
    handleAction('@CollectionPage/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@CollectionPage/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@CollectionPage/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@CollectionPage/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CollectionPage/updateStatusPageSuccess', ({ state, action }) => {
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
          return item;
        }),
      };
    }),
    handleAction('@CollectionPage/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@CollectionPage/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@CollectionPage/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: state.ids.filter(id => !action.payload.ids.includes(id)),
        isSelectAll: false,
      };
    }),
    handleAction('@CollectionPage/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
      ids: state.ids.filter(id => id !== action.payload.id),
    })),
    handleAction('@CollectionPage/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@CollectionPage/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@CollectionPage/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@CollectionPage/duplicateCollectionPageRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CollectionPage/duplicateCollectionPageSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@CollectionPage/duplicateCollectionPageFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@CollectionPage/LoadMoreCollectionPageRequest', ({ state }) => ({ ...state, loadMorePageStatus: 'loading' })),
    handleAction('@CollectionPage/LoadMoreCollectionPageSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@CollectionPage/LoadMoreCollectionPageFailure', ({ state }) => ({ ...state, loadMorePageStatus: 'failure' })),
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentCollectionItem } = sliceCollectionPage.actions;

export const useCreateCollectionPage = createDispatchAsyncAction(actionCreateCollectionPage);
export const useGetCollectionPageItems = createDispatchAsyncAction(actionGetCollectionPages);
export const useDeleteCollectionPages = createDispatchAsyncAction(actionDeleteCollectionPages);
export const useUpdateStatusCollectionPage = createDispatchAsyncAction(actionUpdateStatusCollectionPage);
export const useLoadMoreCollectionPage = createDispatchAsyncAction(actionLoadMoreCollectionPage);
export const useDuplicateCollectionPage = createDispatchAsyncAction(actionDuplicateCollectionPage);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentCollectionItem = createDispatchAction(setCurrentCollectionItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
