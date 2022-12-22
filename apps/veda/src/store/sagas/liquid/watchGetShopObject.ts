import { put, retry, takeLeading, select } from '@redux-saga/core/effects';
import { omit } from 'ramda';
import { liquidVariables } from 'services/LiquidVariables';
import { getShopObject } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

export function* handleGetShopObject(_: ReturnType<typeof getShopObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { statusRequestShopObject, data } = liquidVariablesSelectors;
  if (statusRequestShopObject === 'success' && data.shop) {
    yield put(getShopObject.success({ shop: data.shop, weight_with_unit: data.weight_with_unit }));
    return;
  }
  try {
    const shop: Awaited<ReturnType<typeof liquidVariables.getShopObject>> = yield retry(3, 1000, liquidVariables.getShopObject);
    yield put(getShopObject.success({ shop: omit(['weight_unit'], shop), weight_with_unit: shop.weight_unit }));
  } catch (error) {
    if (notifyAxiosHandler.isAxiosError(error)) {
      yield put(getShopObject.failure(undefined));
    } else {
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetShopObject() {
  yield takeLeading(getActionType(getShopObject.request), handleGetShopObject);
}
