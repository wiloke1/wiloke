import { Option } from 'components/SelectAntd';
import { createSelector } from 'reselect';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createCategoryOfPageProduct, getCategoriesOfPageProduct } from '../actions/actionPagesProduct';

type CategoryExtraActions = ActionTypes<typeof createCategoryOfPageProduct | typeof getCategoriesOfPageProduct>;

type Actions = any;

interface State {
  categories: SectionCategoryForFrontend[];
  getStatus: Status;
  createStatus: Status;
}

export const slicePagesProduct = createSlice<State, Actions, CategoryExtraActions>({
  name: '@PageManager',
  initialState: {
    categories: [],
    createStatus: 'idle',
    getStatus: 'idle',
  },
  reducers: [],
  extraReducers: [
    handleAction('@PageManager/getCategoriesOfPageProduct/request', ({ state }) => ({
      ...state,
      getStatus: state.categories.length > 0 ? 'success' : 'loading',
    })),
    handleAction('@PageManager/getCategoriesOfPageProduct/success', ({ state, action }) => ({
      ...state,
      getStatus: 'success',
      categories: action.payload,
    })),
    handleAction('@PageManager/getCategoriesOfPageProduct/failure', ({ state }) => ({ ...state, getStatus: 'failure' })),

    handleAction('@PageManager/createCategoryOfPageProduct/request', ({ state }) => ({ ...state, createStatus: 'loading' })),
    handleAction('@PageManager/createCategoryOfPageProduct/success', ({ state, action }) => ({
      ...state,
      createStatus: 'success',
      categories: [action.payload, ...state.categories],
    })),
    handleAction('@PageManager/createCategoryOfPageProduct/failure', ({ state }) => ({ ...state, createStatus: 'failure' })),
  ],
});

export const pagesProductSelector = (state: AppState) => state.adminDashboard.pagesProduct;

export const transformUserPageCategories = createSelector(
  (state: AppState) => state.adminDashboard.pagesProduct,
  state => {
    const { categories } = state;
    return categories.map<Option>(item => {
      return {
        label: item.title,
        value: item.slug,
        commandId: item.commandId,
      };
    });
  },
);
