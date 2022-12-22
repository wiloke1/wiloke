import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { createCouponService } from 'services/UserService/Logic/createCoupon';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createCoupon } from '../actions';
import { setVisibleModalCoupon } from '../sliceCoupon';

function* handleCreateCoupon({ payload: { coupon, onFulFill } }: ReturnType<typeof createCoupon.request>) {
  try {
    const response: SagaReturnType<typeof createCouponService> = yield retry(3, 1000, createCouponService, {
      ...coupon,
      expiredOn: new Date(coupon.expiredOn as Date).getTime(),
    });
    yield put(createCoupon.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setVisibleModalCoupon(false));
    onFulFill?.();
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(createCoupon.failure(undefined));
  }
}

export function* watchCreateCoupon() {
  yield takeLatest(getActionType(createCoupon.request), handleCreateCoupon);
}
