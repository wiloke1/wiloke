import { isEmpty } from 'ramda';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { addDraftCategory, getDraftCategories } from 'containers/ChooseTemplate/store/actions';
import { createSelector } from 'reselect';
import { Option } from 'components/SelectAntd';

type CategoryExtraActions = ActionTypes<typeof getDraftCategories | typeof addDraftCategory>;
interface CategoryActions {
  type: 'setDraftCategory';
  payload: {
    slug: string;
    id: string;
  };
}

export interface CategoryState {
  categories: SectionCategoryForFrontend[];
  getStatus: Status;
  addStatus: Status;
  message: string;
  draftCategorySlug: SectionCategoryForFrontend['slug'];
  draftCategoryId: SectionCategoryForFrontend['commandId'];
}

export const defaultNavigationSectionChooseTemplate: CategoryState = {
  addStatus: 'idle',
  getStatus: 'idle',
  categories: [],
  message: '',
  draftCategorySlug: '',
  draftCategoryId: '',
};

export const sliceDraftCategory = createSlice<CategoryState, CategoryActions, CategoryExtraActions>({
  initialState: defaultNavigationSectionChooseTemplate,
  name: '@ChooseTemplate',
  reducers: [
    handleAction('setDraftCategory', ({ state, action }) => {
      state.draftCategorySlug = action.payload.slug;
      state.draftCategoryId = action.payload.id;
    }),
  ],
  extraReducers: [
    handleAction('@ChooseTemplate/getDraftCategories/request', ({ state }) => ({
      ...state,
      getStatus: isEmpty(state.categories) ? 'loading' : 'success',
    })),
    handleAction('@ChooseTemplate/getDraftCategories/success', ({ state, action }) => ({
      ...state,
      getStatus: 'success',
      categories: action.payload.data,
    })),
    handleAction('@ChooseTemplate/getDraftCategories/failure', ({ state, action }) => ({
      ...state,
      getStatus: 'failure',
      message: action.payload.message,
    })),

    handleAction('@ChooseTemplate/addDraftCategory/request', ({ state }) => ({ ...state, addStatus: 'loading' })),
    handleAction('@ChooseTemplate/addDraftCategory/success', ({ state, action }) => ({
      ...state,
      addStatus: 'success',
      categories: [action.payload, ...state.categories],
    })),
    handleAction('@ChooseTemplate/addDraftCategory/failure', ({ state, action }) => ({
      ...state,
      addStatus: 'failure',
      message: action.payload.message,
    })),
  ],
});

export const { setDraftCategory } = sliceDraftCategory.actions;

export const useSetDraftCategory = createDispatchAction(setDraftCategory);

export const draftCategorySelector = (state: AppState) => state.chooseTemplate.draftCategory;

export const transformDraftCategories = createSelector(
  (state: AppState) => state.chooseTemplate.draftCategory,
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
