import { Option } from 'components/SelectAntd';
import { createSelector } from 'reselect';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createCategoryOfThemeProduct, getCategoriesOfThemeProduct } from '../actions/actionThemesProduct';

type CategoryExtraActions = ActionTypes<typeof createCategoryOfThemeProduct | typeof getCategoriesOfThemeProduct>;

type Actions = any;

interface State {
  categories: SectionCategoryForFrontend[];
  getStatus: Status;
  createStatus: Status;
}

export const sliceThemesProduct = createSlice<State, Actions, CategoryExtraActions>({
  name: '@ThemeManager',
  initialState: {
    categories: [],
    createStatus: 'idle',
    getStatus: 'idle',
  },
  reducers: [],
  extraReducers: [
    handleAction('@ThemeManager/getCategoriesOfThemeProduct/request', ({ state }) => ({
      ...state,
      getStatus: state.categories.length > 0 ? 'success' : 'loading',
    })),
    handleAction('@ThemeManager/getCategoriesOfThemeProduct/success', ({ state, action }) => ({
      ...state,
      getStatus: 'success',
      categories: action.payload,
    })),
    handleAction('@ThemeManager/getCategoriesOfThemeProduct/failure', ({ state }) => ({ ...state, getStatus: 'failure' })),

    handleAction('@ThemeManager/createCategoryOfThemeProduct/request', ({ state }) => ({ ...state, createStatus: 'loading' })),
    handleAction('@ThemeManager/createCategoryOfThemeProduct/success', ({ state, action }) => ({
      ...state,
      createStatus: 'success',
      categories: [action.payload, ...state.categories],
    })),
    handleAction('@ThemeManager/createCategoryOfThemeProduct/failure', ({ state }) => ({ ...state, createStatus: 'failure' })),
  ],
});

export const themesProductSelector = (state: AppState) => state.adminDashboard.themesProduct;

export const transformUserThemeCategories = createSelector(
  (state: AppState) => state.adminDashboard.themesProduct,
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
