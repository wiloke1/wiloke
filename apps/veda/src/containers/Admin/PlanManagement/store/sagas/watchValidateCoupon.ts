import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { validateCouponService } from 'services/UserService/Logic/validateCoupon';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { validateCoupon } from '../actions';
import { setValidateCouponVisible } from '../sliceCoupon';

function* handleValidate({ payload: { couponCode, planHandle } }: ReturnType<typeof validateCoupon.request>) {
  try {
    const response: SagaReturnType<typeof validateCouponService> = yield retry(3, 1000, validateCouponService, { couponCode, planHandle });
    yield put(validateCoupon.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setValidateCouponVisible(false));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(validateCoupon.failure(undefined));
  }
}

export function* watchValidateCoupon() {
  yield takeLatest(getActionType(validateCoupon.request), handleValidate);
}
