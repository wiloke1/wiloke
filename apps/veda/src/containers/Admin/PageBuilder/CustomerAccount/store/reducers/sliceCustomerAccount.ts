import { updatePageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { AdminPageData, FilterTypePage } from 'containers/Admin/types';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  actionCreateCustomerAccount,
  actionDeleteCustomerAccounts,
  actionDuplicateCustomerAccount,
  actionGetCustomerAccounts,
  actionLoadMoreCustomerAccount,
  actionUpdateStatusCustomerAccount,
  SetCurrentCustomerAccountItem,
  ChangeSearchKey,
  FilterPageType,
  IsSelectAll,
  SelectIds,
} from '../actions';

type RecordStatus = Record<string, Status>;

type CustomerAccountActions = SetCurrentCustomerAccountItem | ChangeSearchKey | FilterPageType | IsSelectAll | SelectIds;

type CustomerAccountExtraActions = ActionTypes<
  | typeof actionCreateCustomerAccount
  | typeof actionDeleteCustomerAccounts
  | typeof actionDuplicateCustomerAccount
  | typeof actionGetCustomerAccounts
  | typeof actionLoadMoreCustomerAccount
  | typeof actionUpdateStatusCustomerAccount
  | typeof updatePageSettings
>;

interface StateCustomerAccount {
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

export const sliceCustomerAccount = createSlice<StateCustomerAccount, CustomerAccountActions, CustomerAccountExtraActions>({
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
  name: '@CustomerAccount',
  reducers: [
    handleAction('setCurrentCustomerAccountItem', ({ state, action }) => {
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
    handleAction('@CustomerAccount/createPageRequest', ({ state }) => ({
      ...state,
      createPageStatus: 'loading',
    })),
    handleAction('@CustomerAccount/createPageSuccess', ({ state }) => {
      return {
        ...state,
        createPageStatus: 'success',
      };
    }),
    handleAction('@CustomerAccount/createPageFailure', ({ state }) => ({
      ...state,
      createPageStatus: 'failure',
    })),
    handleAction('@CustomerAccount/updateStatusPageRequest', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerAccount/updateStatusPageSuccess', ({ state, action }) => {
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
    handleAction('@CustomerAccount/updateStatusPageFailure', ({ state, action }) => ({
      ...state,
      updatePageStatus: {
        ...state.updatePageStatus,
        [action.payload.id]: 'failure',
      },
    })),
    handleAction('@CustomerAccount/deletePagesRequest', ({ state }) => ({
      ...state,
      deletePending: state.ids,
    })),
    handleAction('@CustomerAccount/deletePagesSuccess', ({ state, action }) => {
      return {
        ...state,
        deletePending: state.deletePending.filter(id => !action.payload.ids.includes(id)),
        data: state.data.filter(item => !action.payload.ids.includes(item.commandId)),
        ids: [],
        isSelectAll: false,
      };
    }),
    handleAction('@CustomerAccount/deletePagesFailure', ({ state, action }) => ({
      ...state,
      deletePending: state.deletePending.filter(id => id !== action.payload.id),
    })),
    handleAction('@CustomerAccount/getPagesRequest', ({ state }) => ({
      ...state,
      getAllPageStatus: 'loading',
      isSelectAll: false,
      ids: [],
    })),
    handleAction('@CustomerAccount/getPagesSuccess', ({ state, action }) => {
      const { data } = action.payload;

      return {
        ...state,
        getAllPageStatus: 'success',
        data,
        hasNextPage: data.length > 0 ? true : false,
      };
    }),
    handleAction('@CustomerAccount/getPagesFailure', ({ state }) => ({
      ...state,
      getAllPageStatus: 'failure',
    })),

    handleAction('@CustomerAccount/duplicateCustomerAccountRequest', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.id]: 'loading',
      },
    })),
    handleAction('@CustomerAccount/duplicateCustomerAccountSuccess', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'success',
      },
      data: [action.payload.item, ...state.data],
    })),
    handleAction('@CustomerAccount/duplicateCustomerAccountFailure', ({ state, action }) => ({
      ...state,
      duplicateStatus: {
        [action.payload.parentId]: 'failure',
      },
    })),
    handleAction('@CustomerAccount/LoadMoreCustomerAccountRequest', ({ state }) => {
      return {
        ...state,
        loadMorePageStatus: 'loading',
      };
    }),
    handleAction('@CustomerAccount/LoadMoreCustomerAccountSuccess', ({ state, action }) => {
      return {
        ...state,
        loadMorePageStatus: 'success',
        data: state.data.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@CustomerAccount/LoadMoreCustomerAccountFailure', ({ state }) => {
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

export const { changSearchKey, filterPageType, isSelectAll, selectIds, setCurrentCustomerAccountItem } = sliceCustomerAccount.actions;

export const useCreateCustomerAccount = createDispatchAsyncAction(actionCreateCustomerAccount);
export const useGetCustomerAccountItems = createDispatchAsyncAction(actionGetCustomerAccounts);
export const useDeleteCustomerAccounts = createDispatchAsyncAction(actionDeleteCustomerAccounts);
export const useUpdateStatusCustomerAccount = createDispatchAsyncAction(actionUpdateStatusCustomerAccount);
export const useLoadMoreCustomerAccount = createDispatchAsyncAction(actionLoadMoreCustomerAccount);
export const useDuplicateCustomerAccount = createDispatchAsyncAction(actionDuplicateCustomerAccount);
export const useSelectManyItems = createDispatchAction(selectIds);
export const useCurrentCustomerAccountItem = createDispatchAction(setCurrentCustomerAccountItem);
export const useSetFilterType = createDispatchAction(filterPageType);
export const useIsSelectAll = createDispatchAction(isSelectAll);
export const useChangeSearchKey = createDispatchAction(changSearchKey);
