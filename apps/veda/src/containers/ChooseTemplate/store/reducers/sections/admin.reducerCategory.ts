import { isEmpty } from 'ramda';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { addAdminCategory, deleteAdminCategory, getAdminCategories, updateAdminCategory } from 'containers/ChooseTemplate/store/actions';

type CategoryExtraActions = ActionTypes<
  typeof getAdminCategories | typeof addAdminCategory | typeof deleteAdminCategory | typeof updateAdminCategory
>;

type CategoryActions =
  | {
      type: 'setAdminCategory';
      payload: {
        slug: string;
        id: string;
      };
    }
  | {
      type: 'editAdminCategory';
      payload: AtLeast<SectionCategoryForFrontend, 'commandId'>;
    };

export interface CategoryState {
  categories: SectionCategoryForFrontend[];
  getStatus: Status;
  addStatus: Status;
  message: string;
  adminCategorySlug: SectionCategoryForFrontend['slug'];
  adminCategoryId: SectionCategoryForFrontend['commandId'];
  deleteStatus: Record<string, Status>;
  updateStatus: Record<string, Status>;
}

export const defaultNavigationSectionChooseTemplate: CategoryState = {
  addStatus: 'idle',
  getStatus: 'idle',
  categories: [],
  message: '',
  adminCategorySlug: '',
  adminCategoryId: '',
  deleteStatus: {},
  updateStatus: {},
};

export const sliceAdminCategory = createSlice<CategoryState, CategoryActions, CategoryExtraActions>({
  initialState: defaultNavigationSectionChooseTemplate,
  name: '@ChooseTemplate',
  reducers: [
    handleAction('setAdminCategory', ({ state, action }) => {
      state.adminCategorySlug = action.payload.slug;
      state.adminCategoryId = action.payload.id;
    }),
    handleAction('editAdminCategory', ({ state, action }) => {
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
  extraReducers: [
    handleAction('@ChooseTemplate/getAdminCategories/request', ({ state }) => ({
      ...state,
      getStatus: isEmpty(state.categories) ? 'loading' : 'success',
    })),
    handleAction('@ChooseTemplate/getAdminCategories/success', ({ state, action }) => ({
      ...state,
      getStatus: 'success',
      categories: action.payload.data,
    })),
    handleAction('@ChooseTemplate/getAdminCategories/failure', ({ state, action }) => ({
      ...state,
      getStatus: 'failure',
      message: action.payload.message,
    })),

    handleAction('@ChooseTemplate/addAdminCategory/request', ({ state }) => ({ ...state, addStatus: 'loading' })),
    handleAction('@ChooseTemplate/addAdminCategory/success', ({ state, action }) => ({
      ...state,
      addStatus: 'success',
      categories: [action.payload, ...state.categories],
    })),
    handleAction('@ChooseTemplate/addAdminCategory/failure', ({ state, action }) => ({
      ...state,
      addStatus: 'failure',
      message: action.payload.message,
    })),
    handleAction('@ChooseTemplate/deleteAdminCategory/request', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/deleteAdminCategory/success', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'success',
      };
      state.categories = state.categories.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@ChooseTemplate/deleteAdminCategory/failure', ({ state, action }) => {
      state.deleteStatus = {
        [action.payload.commandId]: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/updateAdminCategory/request', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/updateAdminCategory/success', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'success',
      };
    }),
    handleAction('@ChooseTemplate/updateAdminCategory/failure', ({ state, action }) => {
      state.updateStatus = {
        [action.payload.commandId]: 'failure',
      };
    }),
  ],
});

export const { setAdminCategory, editAdminCategory } = sliceAdminCategory.actions;

export const useSetAdminCategory = createDispatchAction(setAdminCategory);
export const useEditAdminCategory = createDispatchAction(editAdminCategory);

export const adminCategorySelector = (state: AppState) => state.chooseTemplate.adminCategory;
