import { ProductSection, SectionCategoryForFrontend } from 'types/Sections';
import { Action, ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  removeSavedSection,
  getSavedSections,
  installFavoriteSection,
  changeMySectionCategory,
  setSavedSectionCategories,
  loadMoreSavedSections,
} from 'containers/ChooseTemplate/store/actions';

type ExtraSavedSectionActions = ActionTypes<
  | typeof removeSavedSection
  | typeof getSavedSections
  | typeof installFavoriteSection
  | typeof changeMySectionCategory
  | typeof setSavedSectionCategories
  | typeof loadMoreSavedSections
>;

interface SavedSectionState {
  data: ProductSection[];

  getStatus: Status;
  deleteStatus: Record<string, Status>;
  installSectionStatus: Record<string, Status>;
  categorySlug: string;
  categories: SectionCategoryForFrontend[];
  loadMoreStatus: Status;
  hasNextPage: boolean;
}

export const sliceSavedSections = createSlice<SavedSectionState, Action, ExtraSavedSectionActions>({
  name: '@ChooseTemplate',
  initialState: {
    data: [],
    getStatus: 'idle',
    deleteStatus: {},
    installSectionStatus: {},
    categorySlug: '',
    categories: [],
    loadMoreStatus: 'idle',
    hasNextPage: false,
  },
  reducers: [],
  extraReducers: [
    // delete
    handleAction('@ChooseTemplate/removeSavedSection/request', ({ state, action }) => {
      state.deleteStatus[action.payload.id] = 'idle';
    }),
    handleAction('@ChooseTemplate/removeSavedSection/success', ({ state, action }) => {
      state.deleteStatus[action.payload.id] = 'success';
      state.data = state.data.filter(item => item.commandId !== action.payload.id);
    }),
    handleAction('@ChooseTemplate/removeSavedSection/failure', ({ state, action }) => {
      state.deleteStatus[action.payload.id] = 'failure';
    }),

    // get
    handleAction('@ChooseTemplate/getSavedSections/request', ({ state }) => {
      state.getStatus = 'loading';
    }),
    handleAction('@ChooseTemplate/getSavedSections/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.data = action.payload.data;
      state.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@ChooseTemplate/getSavedSections/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),

    // install
    handleAction('@ChooseTemplate/installFavoriteSection/request', ({ state, action }) => {
      state.installSectionStatus = {
        [action.payload.parentCommandId]: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/installFavoriteSection/success', ({ state, action }) => {
      state.installSectionStatus = {
        [action.payload.parentCommandId]: 'success',
      };
    }),
    handleAction('@ChooseTemplate/installFavoriteSection/failure', ({ state, action }) => {
      state.installSectionStatus = {
        [action.payload.parentCommandId]: 'failure',
      };
    }),

    handleAction('@ChooseTemplate/changeMySectionCategory', ({ state, action }) => {
      state.categorySlug = action.payload.categorySlug;
    }),

    handleAction('@ChooseTemplate/setSavedSectionCategories', ({ state, action }) => {
      state.categories = action.payload.categories;
    }),

    handleAction('@ChooseTemplate/loadMoreSavedSections/request', ({ state }) => {
      state.loadMoreStatus = 'idle';
    }),
    handleAction('@ChooseTemplate/loadMoreSavedSections/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.data = state.data.concat(action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@ChooseTemplate/loadMoreSavedSections/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),
  ],
});
