import { Option } from 'components/SelectAntd';
import { createSelector } from 'reselect';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createDraftAddonsCategory, getDraftAddonsCategory } from '../../actions';

type ExtraActions = ActionTypes<typeof getDraftAddonsCategory | typeof createDraftAddonsCategory>;

interface DraftCategoryAddonActions {
  type: 'setDraftAddonsCategory';
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
}

export const sliceDraftAddonCategory = createSlice<State, DraftCategoryAddonActions, ExtraActions>({
  name: '@ChooseTemplate',
  initialState: {
    categories: [],
    categoryId: '',
    categorySlug: '',
    getAllStatus: 'idle',
    addStatus: 'idle',
  },
  reducers: [
    handleAction('setDraftAddonsCategory', ({ state, action }) => {
      state.categoryId = action.payload.id;
      state.categorySlug = action.payload.slug;
    }),
  ],
  extraReducers: [
    handleAction('@ChooseTemplate/getDraftAddonsCategory/request', ({ state }) => {
      return {
        ...state,
        getAllStatus: state.categories.length > 0 ? 'success' : 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getDraftAddonsCategory/success', ({ state, action }) => {
      return {
        ...state,
        getAllStatus: 'success',
        categories: action.payload.data,
      };
    }),
    handleAction('@ChooseTemplate/getDraftAddonsCategory/failure', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'failure',
      };
    }),
    handleAction('@ChooseTemplate/createDraftAddonsCategory/request', ({ state }) => {
      return {
        ...state,
        addStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/createDraftAddonsCategory/success', ({ state, action }) => {
      return {
        ...state,
        addStatus: 'success',
        categories: [action.payload, ...state.categories],
      };
    }),
    handleAction('@ChooseTemplate/createDraftAddonsCategory/failure', ({ state }) => {
      return {
        ...state,
        addStatus: 'failure',
      };
    }),
  ],
});

export const { setDraftAddonsCategory } = sliceDraftAddonCategory.actions;

export const useSetDraftAddonsCategory = createDispatchAction(setDraftAddonsCategory);

export const transformDraftAddonCategories = createSelector(
  (state: AppState) => state.chooseTemplate.draftAddonCategory,
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
