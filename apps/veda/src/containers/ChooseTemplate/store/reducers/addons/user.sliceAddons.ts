import { addAddons, deleteProductAddons, getAddonsTemplate, loadMoreAddonsTemplate } from 'containers/ChooseTemplate/store/actions';
import { ProductAddon } from 'types/Addons';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type TemplateAddonsExtraActions = ActionTypes<
  typeof getAddonsTemplate | typeof addAddons | typeof deleteProductAddons | typeof loadMoreAddonsTemplate
>;

interface TemplateAddonsActions {
  type: 'unhideSingleAddons';
  payload: string;
}

export const defaultDataTemplateAddons: AddonState = {
  addons: [],
  addAddonStatus: {},
  deleteStatus: {},
  getAddonsStatus: 'idle',
  hasNextPage: false,
  loadMoreStatus: 'idle',
  searchKey: '',
};

export interface AddonState {
  addons: ProductAddon[];
  deleteStatus: Record<string, Status>;
  getAddonsStatus: Status;
  addAddonStatus: Record<string, Status>;
  loadMoreStatus: Status;
  hasNextPage: boolean;
  searchKey: string;
}

export const sliceTemplateAddons = createSlice<AddonState, TemplateAddonsActions, TemplateAddonsExtraActions>({
  initialState: defaultDataTemplateAddons,
  name: '@ChooseTemplate',
  reducers: [
    handleAction('unhideSingleAddons', ({ state, action }) => {
      const { payload } = action;
      return {
        ...state,
        addons: state.addons.map(item => {
          if (item.commandId === payload) {
            return {
              ...item,
              saved: false,
            };
          }
          return item;
        }),
      };
    }),
  ],
  extraReducers: [
    // get addons by cate id
    handleAction('@ChooseTemplate/getAddonsTemplate/request', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getAddonsTemplate/success', ({ state, action }) => {
      return {
        ...state,
        getAddonsStatus: 'success',
        addons: action.payload.data,
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/getAddonsTemplate/failure', ({ state }) => {
      return {
        ...state,
        getAddonsStatus: 'failure',
      };
    }),

    // add addons
    handleAction('@ChooseTemplate/addAddons/request', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/addAddons/success', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.map(item => {
          if (item.commandId === action.payload.commandId) {
            return {
              ...item,
              saved: true,
            };
          }
          return item;
        }),
      };
    }),
    handleAction('@ChooseTemplate/addAddons/failure', ({ state, action }) => {
      return {
        ...state,
        addAddonStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),

    // delete addons
    handleAction('@ChooseTemplate/deleteAddons/request', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteAddons/success', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'success',
        },
        addons: state.addons.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/deleteAddons/failure', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),

    // load more
    handleAction('@ChooseTemplate/loadMoreAddonsTemplate/request', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreAddonsTemplate/success', ({ state, action }) => {
      return {
        ...state,
        loadMoreStatus: 'success',
        addons: state.addons.concat(action.payload.data),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/loadMoreAddonsTemplate/failure', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'failure',
      };
    }),
  ],
});

const { unhideSingleAddons } = sliceTemplateAddons.actions;

const useUnhideSingleAddons = createDispatchAction(unhideSingleAddons);

export { unhideSingleAddons, useUnhideSingleAddons };
