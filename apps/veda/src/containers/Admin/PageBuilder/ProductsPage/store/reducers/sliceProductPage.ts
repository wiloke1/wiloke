import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateProductPage,
  actionDeleteProductPages,
  actionDuplicateProductPage,
  actionGetProductPages,
  actionLoadMoreProductPage,
  actionUpdateStatusProductPage,
  SetCurrentProductItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type ProductActions = SetCurrentProductItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type ProductExtraActions = ActionTypes<
  | typeof actionCreateProductPage
  | typeof actionDeleteProductPages
  | typeof actionDuplicateProductPage
  | typeof actionGetProductPages
  | typeof actionLoadMoreProductPage
  | typeof actionUpdateStatusProductPage
  | typeof updatePageSettings
>;

interface StateProductPage {
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

export const sliceProductPage = createSlice<StateProductPage, ProductActions, ProductExtraActions>({
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
  name: '@ProductPage',
  reducers: [
    handleAction('setCurrentProductItem', ({ state, action }) => {
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
    handleAction('@ProductPage/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@ProductPage/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@ProductPage/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@ProductPage/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@ProductPage/updateStatusPageSuccess', ({ state, action }) => {
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
    handleAction('@ProductPage/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@ProductPage/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@ProductPage/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        ids: state.ids.filter(id => !action.payload.ids.includes(id)),
        isSelectAll: false,
      };
    }),
    handleAction('@ProductPage/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
      ids: state.ids.filter(id => id !== action.payload.id),
    })),
    handleAction('@ProductPage/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@ProductPage/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@ProductPage/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@ProductPage/duplicateProductPageRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@ProductPage/duplicateProductPageSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@ProductPage/duplicateProductPageFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@ProductPage/LoadMoreProductPageRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@ProductPage/LoadMoreProductPageSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ProductPage/LoadMoreProductPageFailure', ({ state }) => {
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentProductItem } = sliceProductPage.actions;

export const useCreateProductPage = createDispatchAsyncAction(actionCreateProductPage);
export const useGetProductPageItems = createDispatchAsyncAction(actionGetProductPages);
export const useDeleteProductPages = createDispatchAsyncAction(actionDeleteProductPages);
export const useUpdateStatusProductPage = createDispatchAsyncAction(actionUpdateStatusProductPage);
export const useLoadMoreProductPage = createDispatchAsyncAction(actionLoadMoreProductPage);
export const useDuplicateProductPage = createDispatchAsyncAction(actionDuplicateProductPage);

export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentProductItem = createDispatchAction(setCurrentProductItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
