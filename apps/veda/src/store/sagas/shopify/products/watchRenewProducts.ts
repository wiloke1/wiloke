import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { notification } from 'antd';
import { productService } from 'services/ShopifyServices/ProductService';
import { renewProducts } from 'store/actions/shopify';
import { ProductState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { renewVersion } from 'utils/CacheControl/CacheControl';
import { getActionType } from 'wiloke-react-core/utils';

function* handleRenewProducts() {
  renewVersion();
  try {
    const { searchKey }: ProductState = yield select(shopifySelector.products);
    const response: Awaited<ReturnType<typeof productService.getProducts>> = yield retry(3, 500, productService.getProducts, searchKey);
    yield put(renewProducts.success({ data: response.info, hasNextPage: response.hasNextPage }));
    notification.success({ message: i18n.t('general.renew_data_success') });
  } catch (error) {
    notification.error({ message: i18n.t('general.renew_data_failure') });
    const _err = error as Error;
    yield put(renewProducts.failure({ message: _err.message }));
  }
}

export function* watchRenewProducts() {
  yield takeLatest(getActionType(renewProducts.request), handleRenewProducts);
}
