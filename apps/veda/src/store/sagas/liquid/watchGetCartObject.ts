import { put, takeLeading } from '@redux-saga/core/effects';
import { getCartObject } from 'store/actions/liquid/actionLiquidVariables';
import { GET_CART_PLACEHOLDER } from 'store/reducers/liquid/randomPlaceholderLiquidObject/GET_CART_PLACEHOLDER';
import { getActionType } from 'wiloke-react-core/utils';

export function* handleGetCartObject(_: ReturnType<typeof getCartObject.request>) {
  yield put(getCartObject.success({ cart: GET_CART_PLACEHOLDER() }));
  // const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  // const { statusRequestCartObject, data } = liquidVariablesSelectors;
  // if (statusRequestCartObject === 'success' && data.cart) {
  //   yield put(getCartObject.success({ cart: data.cart }));
  //   return;
  // }
  // try {
  //   const cart: Awaited<ReturnType<typeof liquidVariables.getCartObject>> = yield retry(3, 1000, liquidVariables.getCartObject);
  //   yield put(getCartObject.success({ cart }));
  // } catch (error) {
  //   if (notifyAxiosHandler.isAxiosError(error)) {
  //     yield put(getCartObject.failure(undefined));
  //   } else {
  //     notifyAxiosHandler.handleError(error as Error);
  //   }
  // }
}

export function* watchGetCartObject() {
  yield takeLeading(getActionType(getCartObject.request), handleGetCartObject);
}
