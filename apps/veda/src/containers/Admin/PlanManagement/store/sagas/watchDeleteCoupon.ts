import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { deleteCouponService } from 'services/UserService/Logic/deleteCoupon';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteCoupon } from '../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteCoupon.request>) {
  try {
    const response: SagaReturnType<typeof deleteCouponService> = yield retry(3, 1000, deleteCouponService, { commandId });
    yield put(deleteCoupon.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(deleteCoupon.failure({ commandId }));
  }
}

export function* watchDeleteCoupon() {
  yield takeLatest(getActionType(deleteCoupon.request), handleDelete);
}
