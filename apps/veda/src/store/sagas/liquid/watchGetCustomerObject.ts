import { put, takeLeading } from '@redux-saga/core/effects';
import { getCustomerObject } from 'store/actions/liquid/actionLiquidVariables';
import { GET_CUSTOMER_PLACEHOLDER } from 'store/reducers/liquid/randomPlaceholderLiquidObject/GET_CUSTOMER_PLACEHOLDER';
import { getActionType } from 'wiloke-react-core/utils';

export function* handleGetCustomerObject(_: ReturnType<typeof getCustomerObject.request>) {
  yield put(getCustomerObject.success({ customer: GET_CUSTOMER_PLACEHOLDER() }));
  // const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  // const { statusRequestCustomerObject, data } = liquidVariablesSelectors;
  // if (statusRequestCustomerObject === 'success' && data.customer) {
  //   yield put(getCustomerObject.success({ customer: data.customer }));
  //   return;
  // }
  // try {
  //   const response: Awaited<ReturnType<typeof liquidVariables.getCustomerObject>> = yield retry(3, 1000, liquidVariables.getCustomerObject);
  //   yield put(getCustomerObject.success({ customer: response.customer }));
  // } catch (error) {
  //   if (notifyAxiosHandler.isAxiosError(error)) {
  //     yield put(getCustomerObject.failure(undefined));
  //   } else {
  //     notifyAxiosHandler.handleError(error as Error);
  //   }
  // }
}

export function* watchGetCustomerObject() {
  yield takeLeading(getActionType(getCustomerObject.request), handleGetCustomerObject);
}
