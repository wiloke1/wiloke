import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { getCouponsService } from 'services/UserService/Logic/getCoupons';
import { getActionType } from 'wiloke-react-core/utils';
import { getCoupons } from '../actions';
import { couponSelector } from '../sliceCoupon';

function* handleGetCoupons(_: ReturnType<typeof getCoupons.request>) {
  try {
    const { getStatus, coupons }: ReturnType<typeof couponSelector> = yield select(couponSelector);
    if (getStatus === 'success') {
      yield put(getCoupons.success(coupons));
    } else {
      const response: SagaReturnType<typeof getCouponsService> = yield retry(3, 1000, getCouponsService);
      yield put(getCoupons.success(response.info));
    }
  } catch (error) {
    yield put(getCoupons.failure(undefined));
  }
}

export function* watchGetCoupons() {
  yield takeLatest(getActionType(getCoupons.request), handleGetCoupons);
}
