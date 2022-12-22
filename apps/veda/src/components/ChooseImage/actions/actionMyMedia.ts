import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { MyMedia, UploadFile, UploadStock } from '../types/MyMedia';

export interface ActionUploadFileToMyMediaRequest extends UploadFile {
  onSuccess?: (data: MyMedia) => void;
  onFailure?: (message: string) => void;
  uniqId: string;
}

export interface ActionUploadFileToMyMediaSuccess {
  data: MyMedia;
  uniqId: string;
}

export interface ActionUploadFileToMyMediaFailure {
  message: string;
  uniqId: string;
}

export const actionUploadFileToMyMedia = createAsyncAction([
  '@MyMedia/uploadFileToMyMediaRequest',
  '@MyMedia/uploadFileToMyMediaSuccess',
  '@MyMedia/uploadFileToMyMediaFailure',
])<ActionUploadFileToMyMediaRequest, ActionUploadFileToMyMediaSuccess, ActionUploadFileToMyMediaFailure>();

export interface ActionUploadStockToMyMediaRequest extends UploadStock {
  onSuccess: (data: MyMedia) => void;
  onFailure: (message: string) => void;
}
export interface ActionUploadStockToMyMediaSuccess extends UploadStock {
  data: MyMedia;
}
export interface ActionUploadStockToMyMediaFailure extends UploadStock {
  message: string;
}

export const actionUploadStockToMyMedia = createAsyncAction([
  '@MyMedia/uploadStockToMyMediaRequest',
  '@MyMedia/uploadStockToMyMediaSuccess',
  '@MyMedia/uploadStockToMyMediaFailure',
])<ActionUploadStockToMyMediaRequest, ActionUploadStockToMyMediaSuccess, ActionUploadStockToMyMediaFailure>();

export interface ActionGetMyMediaRequest {
  name?: string;
  date?: number;
}

export interface ActionGetMyMediaSuccess {
  data: MyMedia[];
  lastCursor: string | undefined;
  hasNextPage: boolean;
}

export interface ActionGetMyMediaFailure {
  message: string;
}

export const actionGetMyMedia = createAsyncAction(['@MyMedia/getMyMediaRequest', '@MyMedia/getMyMediaSuccess', '@MyMedia/getMyMediaFailure'])<
  ActionGetMyMediaRequest,
  ActionGetMyMediaSuccess,
  ActionGetMyMediaFailure
>();

export const actionLoadMoreMyMedia = createAsyncAction([
  '@MyMedia/loadMoreMyMediaRequest',
  '@MyMedia/loadMoreMyMediaSuccess',
  '@MyMedia/loadMoreMyMediaFailure',
])<ActionGetMyMediaRequest, ActionGetMyMediaSuccess, ActionGetMyMediaFailure>();

export const actionDeleteMyMedia = createAsyncAction([
  '@MyMedia/deleteMyMediaRequest',
  '@MyMedia/deleteMyMediaSuccess',
  '@MyMedia/deleteMyMediaFailure',
])<{ id: string | number }, { id: string | number }, { id: string | number }>();

export const filterMyMedia = createAction('@MyMedia/filterMyMedia', ({ date, name }: { name?: string; date?: number }) => ({ date, name }));

export const removeBackground = createAsyncAction([
  '@ChooseImage/removeBackground/request',
  '@ChooseImage/removeBackground/success',
  '@ChooseImage/removeBackground/failure',
])<{ data: UploadFile; id: string; name: string }, { id: string }, { id: string }>();

export const setChooseImage = createAction('@ChooseImage/setChooseImage', (image: string) => ({ image }));

export const useGetMyMedia = createDispatchAsyncAction(actionGetMyMedia);
export const useUploadFileToMyMedia = createDispatchAsyncAction(actionUploadFileToMyMedia);
export const useUploadStockToMyMedia = createDispatchAsyncAction(actionUploadStockToMyMedia);
export const useLoadMoreMyMedia = createDispatchAsyncAction(actionLoadMoreMyMedia);
export const useDeleteMyMedia = createDispatchAsyncAction(actionDeleteMyMedia);
export const useSetChooseImage = createDispatchAction(setChooseImage);
export const useFilterMyMedia = createDispatchAction(filterMyMedia);
export const useRemoveBackground = createDispatchAsyncAction(removeBackground);
