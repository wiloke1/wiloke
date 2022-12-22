import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { mediaService } from 'services/MediaService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getShopifyProducts } from '../actions/actionShopify';
import { ProductItem } from '../reducers/reducerShopify';

export interface ResponseSuccess {
  message: string;
  status: string;
  data: {
    items: ProductItem[];
    hasNextPage: boolean;
  };
}
export interface ResponseError {
  message: string;
  code: number;
}

function* handleGetShopifyProducts({ payload }: ReturnType<typeof getShopifyProducts.request>) {
  try {
    const statusRequest: Status = yield select(
      (state: AppState) => state.imageGallery.shopify.data[state.imageGallery.shopify.searchKey].statusRequest ?? 'idle',
    );
    if (statusRequest !== 'success') {
      const res: ResponseSuccess | ResponseError = yield retry(3, 500, mediaService.getShopifyMedia, payload.searchKey);
      const _dataError = res as ResponseError;
      const _dataSuccess = res as ResponseSuccess;
      const _lastCursor = _dataSuccess.data.items[_dataSuccess.data.items.length - 1]?.cursor;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }

      yield put(
        getShopifyProducts.success({
          data: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          searchKey: payload.searchKey,
          lastCursor: _lastCursor,
        }),
      );
    }
  } catch (err) {
    const _err = err as Error;
    yield put(
      getShopifyProducts.failure({
        searchKey: payload.searchKey,
        message: notifyAxiosHandler.handleErrorDetail({
          error: _err.message,
          showNotification: true,
          fileDetail: '42 watchGetShopifyProducts',
        }),
      }),
    );
  }
}

export function* watchGetShopifyProducts() {
  yield takeLatest(getActionType(getShopifyProducts.request), handleGetShopifyProducts);
}
