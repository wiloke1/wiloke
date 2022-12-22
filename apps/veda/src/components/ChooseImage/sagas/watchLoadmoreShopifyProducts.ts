import { AxiosResponse } from 'axios';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreShopifyProducts } from '../actions/actionShopify';
import { ProductItem } from '../reducers/reducerShopify';

export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  message: string;
  status: string;
  data: {
    items: ProductItem[];
    hasNextPage: boolean;
  };
}

function* handleLoadmoreShopifyProducts({ payload }: ReturnType<typeof actionLoadMoreShopifyProducts.request>) {
  try {
    const { data, searchKey }: AppState['imageGallery']['shopify'] = yield select((state: AppState) => state.imageGallery.shopify);
    const { hasNextPage, lastCursor } = data[searchKey];
    if (!hasNextPage) {
      yield put(actionLoadMoreShopifyProducts.success({ data: [], hasNextPage: false, lastCursor, searchKey: '' }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'manual-products',
        params: {
          s: searchKey ? searchKey : undefined,
          cursor: lastCursor,
        },
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      const _lastCursor = _dataSuccess.data.items[_dataSuccess.data.items.length - 1]?.cursor;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
      yield put(
        actionLoadMoreShopifyProducts.success({
          data: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _lastCursor,
          searchKey: payload.searchKey,
        }),
      );
    }
    // const products: ProductItem[] = yield call(loadmoreShopifyFlow);
    // yield put(actionLoadMoreShopifyProducts.success({ data: products, hasNextPage: !!products.length, searchKey: payload.searchKey }));
  } catch (err) {
    const _err = err as Error;
    yield put(
      actionLoadMoreShopifyProducts.failure({
        searchKey: payload.searchKey,
        message: notifyAxiosHandler.handleErrorDetail({ error: _err.message, showNotification: true, fileDetail: '37 watchLoadmoreShopifyProducts' }),
      }),
    );
  }
}

export function* watchLoadmoreShopifyProducts() {
  yield takeLatest(getActionType(actionLoadMoreShopifyProducts.request), handleLoadmoreShopifyProducts);
}
