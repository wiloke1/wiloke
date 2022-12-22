import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { updateCouponService } from 'services/UserService/Logic/updateCoupon';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateCoupon } from '../actions';
import { editCoupon } from '../sliceCoupon';

function* handleUpdate({ payload: coupon }: ReturnType<typeof updateCoupon.request>) {
  try {
    const response: SagaReturnType<typeof updateCouponService> = yield retry(3, 1000, updateCouponService, {
      ...coupon,
      expiredOn: new Date(coupon.expiredOn).getTime(),
    });
    yield put(updateCoupon.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(editCoupon(undefined));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(updateCoupon.failure({ commandId: coupon.commandId }));
  }
}

export function* watchUpdateCoupon() {
  yield takeLatest(getActionType(updateCoupon.request), handleUpdate);
}
