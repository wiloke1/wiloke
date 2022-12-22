import { isEmpty } from 'ramda';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createProductCategory, deleteProductCategory, getTemplateCategories, updateProductCategory } from 'containers/ChooseTemplate/store/actions';

type CategoryExtraActions = ActionTypes<
  typeof getTemplateCategories | typeof createProductCategory | typeof deleteProductCategory | typeof updateProductCategory
>;
type CategoryActions =
  | {
      type: 'setUserCategorySection';
      payload: {
        categoryId: string;
        categorySlug: string;
        sectionQuantityOfCategory?: number;
      };
    }
  | {
      type: 'editProductCategory';
      payload: AtLeast<SectionCategoryForFrontend, 'commandId'>;
    };

export interface CategoryState {
  categories: SectionCategoryForFrontend[];
  getStatus: Status;
  createStatus: Status;
  message: string;
  categoryId: string;
  categorySlug: string;
  deleteStatus: Record<string, Status>;
  updateStatus: Record<string, Status>;
  sectionQuantiryOfCategory: number;
}

export const defaultNavigationSectionChooseTemplate: CategoryState = {
  getStatus: 'idle',
  createStatus: 'idle',

  categories: [],
  message: '',
  categoryId: '',
  categorySlug: '',
  deleteStatus: {},
  updateStatus: {},
  sectionQuantiryOfCategory: 0,
};

export const sliceCategory = createSlice<CategoryState, CategoryActions, CategoryExtraActions>({
  initialState: defaultNavigationSectionChooseTemplate,
  reducers: [
    handleAction('setUserCategorySection', ({ state, action }) => {
      state.categoryId = action.payload.categoryId;
      state.categorySlug = action.payload.categorySlug;
      state.sectionQuantiryOfCategory = action.payload.sectionQuantityOfCategory ?? state.sectionQuantiryOfCategory;
    }),
    handleAction('editProductCategory', ({ state, action }) => {
      state.categories = state.categories.map(item => {
        if (item.commandId === action.payload.commandId) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    }),
  ],
  name: '@ChooseTemplate',
  extraReducers: [
    handleAction('@ChooseTemplate/getTemplateCategories/request', ({ state }) => ({
      ...state,
      getStatus: isEmpty(state.categories) ? 'loading' : 'success',
    })),
    handleAction('@ChooseTemplate/getTemplateCategories/success', ({ state, action }) => ({
      ...state,
      getStatus: 'success',
      categories: action.payload.data,
    })),
    handleAction('@ChooseTemplate/getTemplateCategories/failure', ({ state, action }) => ({
      ...state,
      getStatus: 'failure',
      message: action.payload.message,
    })),
    handleAction('@ChooseTemplate/createProductCategory/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@ChooseTemplate/createProductCategory/success', ({ state, action }) => {
      state.createStatus = 'success';
      state.categories = [action.payload, ...state.categories];
    }),
    handleAction('@ChooseTemplate/createProductCategory/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
    handleAction('@ChooseTemplate/deleteProductCategory/request', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/deleteProductCategory/success', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'success',
      };
      state.categories = state.categories.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@ChooseTemplate/deleteProductCategory/failure', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/updateProductCategory/request', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/updateProductCategory/success', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'success',
      };
    }),
    handleAction('@ChooseTemplate/updateProductCategory/failure', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'failure',
      };
    }),
  ],
});

export const { setUserCategorySection, editProductCategory } = sliceCategory.actions;

export const useSetUserCategorySection = createDispatchAction(setUserCategorySection);
export const useEditProductCategory = createDispatchAction(editProductCategory);
