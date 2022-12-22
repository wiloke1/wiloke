import { getSection, getSections, loadMoreSections, saveSection, deleteProductSection } from 'containers/ChooseTemplate/store/actions';
import { ProductSection } from 'types/Sections';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type SectionsExtraActions = ActionTypes<
  typeof getSections | typeof getSection | typeof saveSection | typeof loadMoreSections | typeof deleteProductSection
>;

interface OpenModalEditCategory {
  type: 'openModalEditCategory';
  payload: boolean;
}

type TemplateSectionActions = OpenModalEditCategory;

export const defaultDataTemplateSection: TemplateSectionState = {
  getAllStatus: 'idle',
  loadMoreStatus: 'idle',
  hasNextPage: false,
  savedStatus: {},
  sections: [],
  message: '',
  sectionIdLoading: '',
  visibleEditCategory: false,
  deleteStatus: {},
};

export interface TemplateSectionState {
  getAllStatus: Status;
  savedStatus: Record<string, Status>;
  deleteStatus: Record<string, Status>;
  loadMoreStatus: Status;
  hasNextPage: boolean;
  sections: ProductSection[];
  message: string;
  sectionIdLoading: string;
  visibleEditCategory: boolean;
}

export const sliceTemplateSections = createSlice<TemplateSectionState, TemplateSectionActions, SectionsExtraActions>({
  initialState: defaultDataTemplateSection,
  name: '@ChooseTemplate',
  reducers: [
    handleAction('openModalEditCategory', ({ state, action }) => {
      return {
        ...state,
        visibleEditCategory: action.payload,
      };
    }),
  ],
  extraReducers: [
    // get all
    handleAction('@ChooseTemplate/getSections/request', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/getSections/success', ({ state, action }) => {
      return {
        ...state,
        getAllStatus: 'success',
        sections: action.payload.data as ProductSection[],
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/getSections/failure', ({ state }) => {
      return {
        ...state,
        getAllStatus: 'failure',
      };
    }),

    // install section
    handleAction('@ChooseTemplate/getSection/request', ({ state, action }) => {
      return {
        ...state,
        sectionIdLoading: action.payload.sectionId,
      };
    }),
    handleAction('@ChooseTemplate/getSection/success', ({ state, action }) => {
      return {
        ...state,
        sectionIdLoading: '',
        sections: state.sections.map(item => {
          if (item.id === action.payload.sectionId) {
            return action.payload.data;
          }
          return item;
        }),
      };
    }),
    handleAction('@ChooseTemplate/getSection/failure', ({ state }) => {
      return {
        ...state,
        sectionIdLoading: '',
      };
    }),

    // load more
    handleAction('@ChooseTemplate/loadMoreSections/request', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'loading',
      };
    }),
    handleAction('@ChooseTemplate/loadMoreSections/success', ({ state, action }) => {
      return {
        ...state,
        loadMoreStatus: 'success',
        sections: state.sections.concat((action.payload.data as unknown) as ProductSection[]),
        hasNextPage: action.payload.hasNextPage,
      };
    }),
    handleAction('@ChooseTemplate/loadMoreSections/failure', ({ state }) => {
      return {
        ...state,
        loadMoreStatus: 'failure',
      };
    }),

    // save section
    handleAction('@ChooseTemplate/savedSection/request', ({ state, action }) => {
      return {
        ...state,
        savedStatus: {
          [action.payload.id]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/savedSection/success', ({ state, action }) => {
      return {
        ...state,
        savedStatus: {
          [action.payload.id]: 'success',
        },
      };
    }),
    handleAction('@ChooseTemplate/savedSection/failure', ({ state, action }) => {
      return {
        ...state,
        savedStatus: {
          [action.payload.id]: 'failure',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteProductSection/request', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@ChooseTemplate/deleteProductSection/success', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'success',
        },
        sections: state.sections.filter(item => item.commandId !== action.payload.commandId),
      };
    }),
    handleAction('@ChooseTemplate/deleteProductSection/failure', ({ state, action }) => {
      return {
        ...state,
        deleteStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
  ],
});

const { openModalEditCategory } = sliceTemplateSections.actions;

const useOpenModalEditCategory = createDispatchAction(openModalEditCategory);

const templateSectionSelector = (state: AppState) => state.chooseTemplate.templateSections;

export { templateSectionSelector, useOpenModalEditCategory };
