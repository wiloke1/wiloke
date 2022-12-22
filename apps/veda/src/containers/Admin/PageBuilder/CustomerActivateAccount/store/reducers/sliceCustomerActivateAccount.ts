import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateCustomerActivateAccount,
  actionDeleteCustomerActivateAccounts,
  actionDuplicateCustomerActivateAccount,
  actionGetCustomerActivateAccounts,
  actionLoadMoreCustomerActivateAccount,
  actionUpdateStatusCustomerActivateAccount,
  SetCurrentCustomerActivateAccountItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type CustomerActivateAccountActions = SetCurrentCustomerActivateAccountItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type CustomerActivateAccountExtraActions = ActionTypes<
  | typeof actionCreateCustomerActivateAccount
  | typeof actionDeleteCustomerActivateAccounts
  | typeof actionDuplicateCustomerActivateAccount
  | typeof actionGetCustomerActivateAccounts
  | typeof actionLoadMoreCustomerActivateAccount
  | typeof actionUpdateStatusCustomerActivateAccount
  | typeof updatePageSettings
>;

interface StateCustomerActivateAccount {
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

export const sliceCustomerActivateAccount = createSlice<
  StateCustomerActivateAccount,
  CustomerActivateAccountActions,
  CustomerActivateAccountExtraActions
>({
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
  name: '@CustomerActivateAccount',
  reducers: [
    handleAction('setCurrentCustomerActivateAccountItem', ({ state, action }) => {
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
    handleAction('@CustomerActivateAccount/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@CustomerActivateAccount/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@CustomerActivateAccount/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@CustomerActivateAccount/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerActivateAccount/updateStatusPageSuccess', ({ state, action }) => {
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
    handleAction('@CustomerActivateAccount/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@CustomerActivateAccount/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@CustomerActivateAccount/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: [],
        isSelectAll: false,
      };
    }),
    handleAction('@CustomerActivateAccount/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
    })),
    handleAction('@CustomerActivateAccount/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@CustomerActivateAccount/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@CustomerActivateAccount/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@CustomerActivateAccount/duplicateCustomerActivateAccountRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerActivateAccount/duplicateCustomerActivateAccountSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@CustomerActivateAccount/duplicateCustomerActivateAccountFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@CustomerActivateAccount/LoadMoreCustomerActivateAccountRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@CustomerActivateAccount/LoadMoreCustomerActivateAccountSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@CustomerActivateAccount/LoadMoreCustomerActivateAccountFailure', ({ state }) => {
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentCustomerActivateAccountItem } = sliceCustomerActivateAccount.actions;

export const useCreateCustomerActivateAccount = createDispatchAsyncAction(actionCreateCustomerActivateAccount);
export const useGetCustomerActivateAccountItems = createDispatchAsyncAction(actionGetCustomerActivateAccounts);
export const useDeleteCustomerActivateAccounts = createDispatchAsyncAction(actionDeleteCustomerActivateAccounts);
export const useUpdateStatusCustomerActivateAccount = createDispatchAsyncAction(actionUpdateStatusCustomerActivateAccount);
export const useLoadMoreCustomerActivateAccount = createDispatchAsyncAction(actionLoadMoreCustomerActivateAccount);
export const useDuplicateCustomerActivateAccount = createDispatchAsyncAction(actionDuplicateCustomerActivateAccount);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentCustomerActivateAccountItem = createDispatchAction(setCurrentCustomerActivateAccountItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
