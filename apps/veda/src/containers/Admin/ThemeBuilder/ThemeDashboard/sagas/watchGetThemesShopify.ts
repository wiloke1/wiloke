import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getThemesShopify } from '../slice/actions';

function* handleGetThemesShopiy(_: ReturnType<typeof getThemesShopify.request>) {
  try {
    const themesShopify: SagaReturnType<typeof shopifyConnectionService.getThemesShopify> = yield retry(
      3,
      1000,
      shopifyConnectionService.getThemesShopify,
    );
    yield put(getThemesShopify.success(themesShopify));
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(getThemesShopify.failure(undefined));
  }
}

export function* watchGetThemesShopify() {
  yield takeLatest(getActionType(getThemesShopify.request), handleGetThemesShopiy);
}
