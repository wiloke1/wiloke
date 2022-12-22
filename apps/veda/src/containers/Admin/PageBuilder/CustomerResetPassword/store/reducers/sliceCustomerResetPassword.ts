import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateCustomerResetPassword,
  actionDeleteCustomerResetPasswords,
  actionDuplicateCustomerResetPassword,
  actionGetCustomerResetPasswords,
  actionLoadMoreCustomerResetPassword,
  actionUpdateStatusCustomerResetPassword,
  SetCurrentCustomerResetPasswordItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type CustomerResetPasswordActions = SetCurrentCustomerResetPasswordItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type CustomerResetPasswordExtraActions = ActionTypes<
  | typeof actionCreateCustomerResetPassword
  | typeof actionDeleteCustomerResetPasswords
  | typeof actionDuplicateCustomerResetPassword
  | typeof actionGetCustomerResetPasswords
  | typeof actionLoadMoreCustomerResetPassword
  | typeof actionUpdateStatusCustomerResetPassword
  | typeof updatePageSettings
>;

interface StateCustomerResetPassword {
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

export const sliceCustomerResetPassword = createSlice<StateCustomerResetPassword, CustomerResetPasswordActions, CustomerResetPasswordExtraActions>({
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
  name: '@CustomerResetPassword',
  reducers: [
    handleAction('setCurrentCustomerResetPasswordItem', ({ state, action }) => {
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
    handleAction('@CustomerResetPassword/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@CustomerResetPassword/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@CustomerResetPassword/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@CustomerResetPassword/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerResetPassword/updateStatusPageSuccess', ({ state, action }) => {
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
    handleAction('@CustomerResetPassword/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@CustomerResetPassword/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@CustomerResetPassword/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: [],
        isSelectAll: false,
      };
    }),
    handleAction('@CustomerResetPassword/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
    })),
    handleAction('@CustomerResetPassword/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@CustomerResetPassword/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@CustomerResetPassword/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@CustomerResetPassword/duplicateCustomerResetPasswordRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerResetPassword/duplicateCustomerResetPasswordSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@CustomerResetPassword/duplicateCustomerResetPasswordFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@CustomerResetPassword/LoadMoreCustomerResetPasswordRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@CustomerResetPassword/LoadMoreCustomerResetPasswordSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@CustomerResetPassword/LoadMoreCustomerResetPasswordFailure', ({ state }) => {
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentCustomerResetPasswordItem } = sliceCustomerResetPassword.actions;

export const useCreateCustomerResetPassword = createDispatchAsyncAction(actionCreateCustomerResetPassword);
export const useGetCustomerResetPasswordItems = createDispatchAsyncAction(actionGetCustomerResetPasswords);
export const useDeleteCustomerResetPasswords = createDispatchAsyncAction(actionDeleteCustomerResetPasswords);
export const useUpdateStatusCustomerResetPassword = createDispatchAsyncAction(actionUpdateStatusCustomerResetPassword);
export const useLoadMoreCustomerResetPassword = createDispatchAsyncAction(actionLoadMoreCustomerResetPassword);
export const useDuplicateCustomerResetPassword = createDispatchAsyncAction(actionDuplicateCustomerResetPassword);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentCustomerResetPasswordItem = createDispatchAction(setCurrentCustomerResetPasswordItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
