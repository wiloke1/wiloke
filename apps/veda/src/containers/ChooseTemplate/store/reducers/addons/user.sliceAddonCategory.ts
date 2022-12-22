import { Option } from 'components/SelectAntd';
import { createUserAddonsCategory, getAddonsNav } from 'containers/ChooseTemplate/store/actions';
import { isEmpty } from 'ramda';
import { createSelector } from 'reselect';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type TemplateAddonsExtraActions = ActionTypes<typeof getAddonsNav | typeof createUserAddonsCategory>;

interface TemplateAddonsActions {
  type: 'setUserAddonsCategory';
  payload: {
    slug: string;
    id: string;
    addonQuantityOfCategory?: number;
  };
}

export interface AddonState {
  addonsNav: SectionCategoryForFrontend[];
  navAddonsId: string;
  navAddonSlug: string;
  getNavStatus: Status;
  addStatus: Status;
  addonQuantityOfCategory: number;
}

export const sliceUserAddonsCategory = createSlice<AddonState, TemplateAddonsActions, TemplateAddonsExtraActions>({
  initialState: {
    addonsNav: [],
    getNavStatus: 'idle',
    addStatus: 'idle',
    navAddonSlug: '',
    navAddonsId: '',
    addonQuantityOfCategory: 0,
  },
  name: '@ChooseTemplate',
  reducers: [
    handleAction('setUserAddonsCategory', ({ state, action }) => {
      state.navAddonsId = action.payload.id;
      state.navAddonSlug = action.payload.slug;
      state.addonQuantityOfCategory = action.payload.addonQuantityOfCategory ?? state.addonQuantityOfCategory;
    }),
  ],
  extraReducers: [
    // get category addons
    handleAction('@ChooseTemplate/getAddonsNav/request', ({ state }) => {
      state.getNavStatus = !isEmpty(state.addonsNav) ? 'success' : 'loading';
    }),
    handleAction('@ChooseTemplate/getAddonsNav/success', ({ state, action }) => {
      state.getNavStatus = 'success';
      state.addonsNav = action.payload.data;
    }),
    handleAction('@ChooseTemplate/getAddonsNav/failure', ({ state }) => {
      state.getNavStatus = 'failure';
    }),
    handleAction('@ChooseTemplate/createUserAddonsCategory/request', ({ state }) => {
      return {
        ...state,
        addStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/createUserAddonsCategory/success', ({ state, action }) => {
      return {
        ...state,
        addStatus: 'success',
        addonsNav: [action.payload, ...state.addonsNav],
      };
    }),
    handleAction('@ChooseTemplate/createUserAddonsCategory/failure', ({ state }) => {
      return {
        ...state,
        addStatus: 'failure',
      };
    }),
  ],
});

const { setUserAddonsCategory } = sliceUserAddonsCategory.actions;

const useSetUserAddonsCategory = createDispatchAction(setUserAddonsCategory);
export { setUserAddonsCategory, useSetUserAddonsCategory };

export const transformUserAddonCategories = createSelector(
  (state: AppState) => state.chooseTemplate.userAddonsCategory,
  state => {
    const { addonsNav } = state;
    return addonsNav.map<Option>(item => {
      return {
        label: item.title,
        value: item.slug,
        commandId: item.commandId,
      };
    });
  },
);
