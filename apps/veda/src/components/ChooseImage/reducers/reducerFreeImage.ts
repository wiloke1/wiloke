import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getCategoriesOfFreeImages, getFreeImages, loadMoreFreeImages } from '../actions/actionGetFreeImages';
import { FreeImageCategoriesData, FreeImages } from '../types/FreeImage';

type Actions = ActionTypes<typeof getFreeImages | typeof getCategoriesOfFreeImages | typeof loadMoreFreeImages>;

interface State {
  images: FreeImages[];
  offset: number;
  getRequest: Status;
  loadMoreStatus: Status;

  categories: FreeImageCategoriesData[];
  getCategoriesStatus: Status;
  hasNextPage: boolean;
}

export const reducerFreeImage = createReducer<State, Actions>(
  {
    images: [],
    offset: 0,
    getRequest: 'idle',
    loadMoreStatus: 'idle',

    categories: [],
    getCategoriesStatus: 'idle',
    hasNextPage: false,
  },
  [
    handleAction('@MyMedia/getFreeImages/request', ({ state }) => {
      state.getRequest = 'loading';
    }),
    handleAction('@MyMedia/getFreeImages/success', ({ state, action }) => {
      state.getRequest = 'success';
      state.images = action.payload.data;
      state.offset = action.payload.data.length;
      state.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@MyMedia/getFreeImages/failure', ({ state }) => {
      state.getRequest = 'failure';
    }),

    handleAction('@MyMedia/loadMoreFreeImages/request', ({ state }) => {
      state.loadMoreStatus = 'loading';
    }),
    handleAction('@MyMedia/loadMoreFreeImages/success', ({ state, action }) => {
      state.loadMoreStatus = 'success';
      state.images = state.images.concat(action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
      state.offset = state.images.length;
    }),
    handleAction('@MyMedia/loadMoreFreeImages/failure', ({ state }) => {
      state.loadMoreStatus = 'failure';
    }),

    handleAction('@MyMedia/getCategoriesOfFreeImages/request', ({ state }) => {
      state.getCategoriesStatus = state.categories.length > 0 ? 'success' : 'loading';
    }),
    handleAction('@MyMedia/getCategoriesOfFreeImages/success', ({ state, action }) => {
      state.getCategoriesStatus = 'success';
      state.categories = action.payload.data;
    }),
    handleAction('@MyMedia/getCategoriesOfFreeImages/failure', ({ state }) => {
      state.getCategoriesStatus = 'failure';
    }),
  ],
);
