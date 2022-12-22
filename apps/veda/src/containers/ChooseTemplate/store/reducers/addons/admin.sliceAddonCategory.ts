import { Option } from 'components/SelectAntd';
import { createSelector } from 'reselect';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createAdminAddonsCategory, getAdminAddonsCategory } from '../../actions';

type ExtraActions = ActionTypes<typeof getAdminAddonsCategory | typeof createAdminAddonsCategory>;

interface AdminCategoryAddonActions {
  type: 'setAdminAddonsCategory';
  payload: {
    slug: string;
    id: string;
  };
}

interface State {
  categories: SectionCategoryForFrontend[];
  getAllStatus: Status;
  categoryId: string;
  categorySlug: string;
  addStatus: Status;
  createChangelogStatus: Status;
}

export const sliceAdminAddonCategory = createSlice<State, AdminCategoryAddonActions, ExtraActions>({
  name: '@ChooseTemplate',
  initialState: {
    categories: [],
    categoryId: '',
    categorySlug: '',
    getAllStatus: 'idle',
    addStatus: 'idle',
    createChangelogStatus: 'idle',
  },
  reducers: [
    handleAction('setAdminAddonsCategory', ({ state, action }) => {
      state.categoryId = action.payload.id;
      state.categorySlug = action.payload.slug;
    }),
  ],
  extraReducers: [
    handleAction('@ChooseTemplate/getAdminAddonsCategory/request', ({ state }) => {
      return {
        ...state,
        getAllStatus: state.categories.length > 0 ? 'success' : 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getAdminAddonsCategory/success', ({ state, action }) => {
      return {
        ...state,
        getAllStatus: 'success',
        categories: action.payload.data,
      };
    }),
    handleAction('@ChooseTemplate/getAdminAddonsCategory/failure', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonsCategory/request', ({ state }) => {
      return {
        ...state,
        addStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonsCategory/success', ({ state, action }) => {
      return {
        ...state,
        addStatus: 'success',
        categories: [action.payload, ...state.categories],
      };
    }),
    handleAction('@ChooseTemplate/createAdminAddonsCategory/failure', ({ state }) => {
      return {
        ...state,
        addStatus: 'failure',
      };
    }),
  ],
});

export const { setAdminAddonsCategory } = sliceAdminAddonCategory.actions;

export const useSetAdminAddonsCategory = createDispatchAction(setAdminAddonsCategory);

export const transformAdminAddonCategories = createSelector(
  (state: AppState) => state.chooseTemplate.adminAddonsCategory,
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
