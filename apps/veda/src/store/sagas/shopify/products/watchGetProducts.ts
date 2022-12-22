import { put, retry, select, takeLatest, takeLeading } from '@redux-saga/core/effects';
import { productService } from 'services/ShopifyServices/ProductService';
import { getProducts, loadMoreProducts } from 'store/actions/shopify';
import { DataState, defaultProductDataState, ProductState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGet() {
  try {
    const { searchKey, products }: ProductState = yield select(shopifySelector.products);
    const { data, hasNextPage, requestStatus } = products[searchKey] || defaultProductDataState;
    if (requestStatus === 'success') {
      yield put(getProducts.success({ data, hasNextPage }));
    } else {
      const response: Awaited<ReturnType<typeof productService.getProducts>> = yield retry(3, 500, productService.getProducts, searchKey);
      yield put(getProducts.success({ data: response.info, hasNextPage: response.hasNextPage }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(getProducts.failure({ message: _err.message }));
  }
}

export function* watchGetProducts() {
  yield takeLatest(getActionType(getProducts.request), handleGet);
}

function* handleLoadMoreProducts() {
  try {
    const { searchKey, products }: ProductState = yield select(shopifySelector.products);
    const { data } = products[searchKey] as Exclude<DataState, undefined>;
    const lastCursor = data[data.length - 1].cursor;

    const response: Awaited<ReturnType<typeof productService.loadMoreProduct>> = yield retry(
      3,
      500,
      productService.loadMoreProduct,
      searchKey,
      lastCursor,
    );

    yield put(loadMoreProducts.success({ data: response.info, hasNextPage: response.hasNextPage }));
  } catch (error) {
    const _err = error as Error;
    yield put(loadMoreProducts.failure({ message: _err.message }));
  }
}

export function* watchLoadMoreProducts() {
  yield takeLeading(getActionType(loadMoreProducts.request), handleLoadMoreProducts);
}
