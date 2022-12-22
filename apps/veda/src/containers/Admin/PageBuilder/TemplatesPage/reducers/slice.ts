import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { PageType } from 'types/Page';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';

import {
  ChangeTabActive,
  deleteTemplatePage,
  getMyTemplates,
  getTemplatesPage,
  loadMoreMyTemplates,
  loadMorePageTemplate,
  saveToMyTemplate,
  ChangePageType,
  deleteFavoritePage,
  ChangeSearchKeyMyTemplates,
  ChangeSearchKeyTemplatePage,
} from './actions';

type TabActive = string;

type Actions = ChangeTabActive | ChangePageType | ChangeSearchKeyMyTemplates | ChangeSearchKeyTemplatePage;

type ExtraActions = ActionTypes<
  | typeof getTemplatesPage
  | typeof saveToMyTemplate
  | typeof loadMorePageTemplate
  | typeof getMyTemplates
  | typeof loadMoreMyTemplates
  | typeof deleteTemplatePage
  | typeof deleteFavoritePage
>;

export interface TemplatePageState {
  tabKey: TabActive;
  selectPageType: PageType | string;
  allTemplates: {
    data: BE_PageProduct[];
    getStatus: Status;
    message: string;
    saveStatus: Record<string, Status>;
    hasNextPage: boolean;
    loadMoreStatus: Status;
    deleteStatus: Record<string, Status>;
    searchKey: string;
  };
  myTemplates: {
    data: BE_PageProduct[];
    getStatus: Status;
    message: string;
    saveStatus: Record<string, Status>;
    hasNextPage: boolean;
    loadMoreStatus: Status;
    deleteStatus: Record<string, Status>;
    searchKey: string;
  };
}

const sliceTemplatePage = createSlice<TemplatePageState, Actions, ExtraActions>({
  initialState: {
    tabKey: 'all',
    selectPageType: 'all',
    allTemplates: {
      saveStatus: {},
      data: [],
      getStatus: 'idle',
      message: '',
      hasNextPage: false,
      loadMoreStatus: 'idle',
      deleteStatus: {},
      searchKey: '',
    },
    myTemplates: {
      saveStatus: {},
      data: [],
      getStatus: 'idle',
      message: '',
      hasNextPage: false,
      loadMoreStatus: 'idle',
      deleteStatus: {},
      searchKey: '',
    },
  },
  name: '@PageBuilder',
  reducers: [
    handleAction('changeTabActive', ({ state, action }) => {
      state.tabKey = action.payload.tabKey;
    }),
    handleAction('changeSelectPageType', ({ state, action }) => {
      state.selectPageType = action.payload;
    }),
    handleAction('changeSearchKeyMyTemplates', ({ state, action }) => {
      state.myTemplates.searchKey = action.payload;
    }),
    handleAction('changeSearchKeyTemplatePage', ({ state, action }) => {
      state.allTemplates.searchKey = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@PageBuilder/getTemplatesPage/request', ({ state }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          getStatus: 'loading',
        },
      };
    }),
    handleAction('@PageBuilder/getTemplatesPage/success', ({ state, action }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          getStatus: 'success',
          data: action.payload.data,
          hasNextPage: action.payload.hasNextPage,
        },
      };
    }),
    handleAction('@PageBuilder/getTemplatesPage/failure', ({ state }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          getStatus: 'failure',
        },
      };
    }),
    handleAction('@PageBuilder/saveToMyTemplate/request', ({ state, action }) => {
      state.allTemplates.saveStatus = {
        [action.payload.parentCommandId]: 'loading',
      };
    }),
    handleAction('@PageBuilder/saveToMyTemplate/success', ({ state, action }) => {
      state.allTemplates.saveStatus = {
        [action.payload.parentCommandId]: 'success',
      };
    }),
    handleAction('@PageBuilder/saveToMyTemplate/failure', ({ state, action }) => {
      state.allTemplates.saveStatus = {
        [action.payload.parentCommandId]: 'failure',
      };
    }),
    handleAction('@PageBuilder/loadMorePageTemplate/request', ({ state }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          loadMoreStatus: 'loading',
        },
      };
    }),
    handleAction('@PageBuilder/loadMorePageTemplate/success', ({ state, action }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          loadMoreStatus: 'success',
          data: state.allTemplates.data.concat(action.payload.data),
          hasNextPage: action.payload.hasNextPage,
        },
      };
    }),
    handleAction('@PageBuilder/loadMorePageTemplate/failure', ({ state }) => {
      return {
        ...state,
        allTemplates: {
          ...state.allTemplates,
          loadMoreStatus: 'failure',
        },
      };
    }),
    handleAction('@PageBuilder/getMyTemplates/request', ({ state }) => {
      state.myTemplates.getStatus = 'loading';
    }),
    handleAction('@PageBuilder/getMyTemplates/success', ({ state, action }) => {
      state.myTemplates.getStatus = 'success';
      state.myTemplates.data = action.payload.data;
      state.myTemplates.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@PageBuilder/getMyTemplates/failure', ({ state }) => {
      state.myTemplates.getStatus = 'failure';
    }),
    handleAction('@PageBuilder/loadMoreMyTemplates/request', ({ state }) => {
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
          loadMoreStatus: 'loading',
        },
      };
    }),
    handleAction('@PageBuilder/loadMoreMyTemplates/success', ({ state, action }) => {
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
          loadMoreStatus: 'success',
          data: state.myTemplates.data.concat(action.payload.data),
          hasNextPage: action.payload.hasNextPage,
        },
      };
    }),
    handleAction('@PageBuilder/loadMoreMyTemplates/failure', ({ state }) => {
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
          loadMoreStatus: 'failure',
        },
      };
    }),
    handleAction('@PageBuilder/deleteTemplatePage/request', ({ state, action }) => {
      state.allTemplates.deleteStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@PageBuilder/deleteTemplatePage/success', ({ state, action }) => {
      state.allTemplates.deleteStatus[action.payload.commandId] = 'success';
      state.allTemplates.data = state.allTemplates.data.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@PageBuilder/deleteTemplatePage/failure', ({ state, action }) => {
      state.allTemplates.deleteStatus[action.payload.commandId] = 'failure';
    }),
    handleAction('@PageBuilder/deleteFavoritePage/request', ({ state, action }) => {
      state.allTemplates.deleteStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@PageBuilder/deleteFavoritePage/success', ({ state, action }) => {
      state.myTemplates.deleteStatus[action.payload.commandId] = 'success';
      state.myTemplates.data = state.myTemplates.data.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@PageBuilder/deleteFavoritePage/failure', ({ state, action }) => {
      state.myTemplates.deleteStatus[action.payload.commandId] = 'failure';
    }),
  ],
});

const { changeTabActive, changeSelectPageType, changeSearchKeyMyTemplates, changeSearchKeyTemplatePage } = sliceTemplatePage.actions;
const useChangeTabActive = createDispatchAction(changeTabActive);
const useGetTemplatesPage = createDispatchAsyncAction(getTemplatesPage);
const useSaveToMyTemplate = createDispatchAsyncAction(saveToMyTemplate);
const useLoadMoreTemplatePage = createDispatchAsyncAction(loadMorePageTemplate);
const useGetMyTemplates = createDispatchAsyncAction(getMyTemplates);
const useLoadMoreMyPageTemplates = createDispatchAsyncAction(loadMoreMyTemplates);
const useDeleteTemplatePage = createDispatchAsyncAction(deleteTemplatePage);
const useDeleteFavoritePage = createDispatchAsyncAction(deleteFavoritePage);
const useChangeSelectPageType = createDispatchAction(changeSelectPageType);
const useChangeSearchKeyMyTemplates = createDispatchAction(changeSearchKeyMyTemplates);
const useChangeSearchKeyAllTemplates = createDispatchAction(changeSearchKeyTemplatePage);

export {
  sliceTemplatePage,
  useDeleteTemplatePage,
  changeTabActive,
  useChangeTabActive,
  useGetTemplatesPage,
  useSaveToMyTemplate,
  useLoadMoreTemplatePage,
  useGetMyTemplates,
  useLoadMoreMyPageTemplates,
  useChangeSelectPageType,
  useDeleteFavoritePage,
  changeSelectPageType,
  useChangeSearchKeyMyTemplates,
  changeSearchKeyMyTemplates,
  useChangeSearchKeyAllTemplates,
  changeSearchKeyTemplatePage,
};
