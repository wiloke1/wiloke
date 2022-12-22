import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { redirectToShopifyPaymentService } from 'services/UserService/Logic/redirectToShopifyPayment';
import { pmLanding } from 'utils/functions/postMessage';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { goToShopifyPayment } from '../actions';

function* handleAction({ payload: { coupon, planHandle, returnUrl, yearly, onFulfill } }: ReturnType<typeof goToShopifyPayment.request>) {
  try {
    const response: SagaReturnType<typeof redirectToShopifyPaymentService> = yield retry(3, 1000, redirectToShopifyPaymentService, {
      coupon,
      planHandle,
      returnUrl,
      yearly,
    });
    yield put(goToShopifyPayment.success({ confirmation_url: response.info.confirmation_url, planHandle }));
    pmLanding.emit('@landing/plan/success');
    onFulfill?.(response.info.confirmation_url);
  } catch (error) {
    notifyAxiosHandler.handleError(error as any);
    yield put(goToShopifyPayment.failure({ planHandle }));
    pmLanding.emit('@landing/plan/failure');
  }
}

export function* watchGoToShopifyPayment() {
  yield takeLatest(getActionType(goToShopifyPayment.request), handleAction);
}
