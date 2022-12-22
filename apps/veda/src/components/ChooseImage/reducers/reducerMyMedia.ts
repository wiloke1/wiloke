import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  actionDeleteMyMedia,
  actionGetMyMedia,
  actionLoadMoreMyMedia,
  actionUploadStockToMyMedia,
  actionUploadFileToMyMedia,
  filterMyMedia,
  removeBackground,
} from '../actions/actionMyMedia';
import { MyMedia } from '../types/MyMedia';

interface State {
  statusRequest: Status;
  statusLoadmore: Status;
  statusUpload: Status;
  statusDelete: Status;
  queueDelete: (string | number)[];
  queueUpload: string[];
  message: string;
  data: MyMedia[];
  lastCursor: string | undefined;
  hasNextPage: boolean;

  imageName?: string;
  filterDate?: number;
  removeBackgroundStatus: Record<string, Status>;
}

type Actions = ActionTypes<
  | typeof actionGetMyMedia
  | typeof actionUploadFileToMyMedia
  | typeof actionUploadStockToMyMedia
  | typeof actionLoadMoreMyMedia
  | typeof actionDeleteMyMedia
  | typeof filterMyMedia
  | typeof removeBackground
>;

const defaultState: State = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  statusDelete: 'idle',
  statusUpload: 'idle',
  queueDelete: [],
  queueUpload: [],
  data: [],
  message: '',
  lastCursor: undefined,
  hasNextPage: false,
  imageName: undefined,
  filterDate: undefined,
  removeBackgroundStatus: {},
};

const reducerMyMedia = createReducer<State, Actions>(defaultState, [
  handleAction('@MyMedia/getMyMediaRequest', ({ state }) => {
    return {
      ...state,
      statusRequest: 'loading',
    };
  }),
  handleAction('@MyMedia/getMyMediaSuccess', ({ state, action }) => {
    const { data, lastCursor, hasNextPage } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      data,
      lastCursor,
      hasNextPage,
    };
  }),
  handleAction('@MyMedia/getMyMediaFailure', ({ state, action }) => {
    const { message } = action.payload;
    return {
      ...state,
      statusRequest: 'failure',
      message,
    };
  }),
  handleAction('@MyMedia/uploadFileToMyMediaRequest', ({ state, action }) => {
    const { uniqId } = action.payload;
    return {
      ...state,
      statusUpload: 'loading',
      queueUpload: state.queueUpload.concat(uniqId),
    };
  }),
  handleAction('@MyMedia/uploadFileToMyMediaSuccess', ({ state, action }) => {
    const { data, uniqId } = action.payload;
    return {
      ...state,
      statusUpload: 'success',
      data: [data, ...state.data],
      queueUpload: state.queueUpload.filter(item => item !== uniqId),
    };
  }),
  handleAction('@MyMedia/uploadFileToMyMediaFailure', ({ state, action }) => {
    const { message, uniqId } = action.payload;
    return {
      ...state,
      statusUpload: 'failure',
      queueUpload: state.queueUpload.filter(item => item !== uniqId),
      message,
    };
  }),
  handleAction('@MyMedia/uploadStockToMyMediaRequest', ({ state, action }) => {
    const { src } = action.payload;
    return {
      ...state,
      queueUpload: state.queueUpload.concat(src),
      statusUpload: 'loading',
    };
  }),
  handleAction('@MyMedia/uploadStockToMyMediaSuccess', ({ state, action }) => {
    const { data, src } = action.payload;
    return {
      ...state,
      statusUpload: state.queueUpload.length ? 'loading' : 'success',
      data: [data, ...state.data],
      queueUpload: state.queueUpload.filter(item => item !== src),
    };
  }),
  handleAction('@MyMedia/uploadStockToMyMediaFailure', ({ state, action }) => {
    const { src, message } = action.payload;
    return {
      ...state,
      statusUpload: 'failure',
      queueUpload: state.queueUpload.filter(item => item !== src),
      message,
    };
  }),
  handleAction('@MyMedia/loadMoreMyMediaRequest', ({ state }) => {
    return {
      ...state,
      statusLoadmore: 'loading',
    };
  }),
  handleAction('@MyMedia/loadMoreMyMediaSuccess', ({ state, action }) => {
    const { data, lastCursor, hasNextPage } = action.payload;
    return {
      ...state,
      statusLoadmore: 'success',
      data: state.data.concat(data),
      lastCursor,
      hasNextPage,
    };
  }),
  handleAction('@MyMedia/loadMoreMyMediaFailure', ({ state, action }) => {
    const { message } = action.payload;
    return {
      ...state,
      statusLoadmore: 'failure',
      message,
    };
  }),
  handleAction('@MyMedia/deleteMyMediaRequest', ({ state, action }) => {
    return {
      ...state,
      queueDelete: state.queueDelete.concat(action.payload.id),
    };
  }),
  handleAction('@MyMedia/deleteMyMediaSuccess', ({ state, action }) => {
    return {
      ...state,
      queueDelete: state.queueDelete.filter(id => id !== action.payload.id),
      data: state.data.filter(media => media.id !== action.payload.id),
    };
  }),
  handleAction('@MyMedia/deleteMyMediaFailure', ({ state, action }) => {
    return {
      ...state,
      queueDelete: state.queueDelete.filter(id => id !== action.payload.id),
    };
  }),
  handleAction('@MyMedia/filterMyMedia', ({ state, action }) => {
    state.imageName = action.payload.name;
    state.filterDate = action.payload.date;
  }),
  handleAction('@ChooseImage/removeBackground/request', ({ state, action }) => {
    state.removeBackgroundStatus[action.payload.id] = 'loading';
  }),
  handleAction('@ChooseImage/removeBackground/success', ({ state, action }) => {
    state.removeBackgroundStatus[action.payload.id] = 'success';
  }),
  handleAction('@ChooseImage/removeBackground/failure', ({ state, action }) => {
    state.removeBackgroundStatus[action.payload.id] = 'failure';
  }),
]);

export default reducerMyMedia;
