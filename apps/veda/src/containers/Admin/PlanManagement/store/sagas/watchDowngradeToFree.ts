import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { downgradeToFreeService } from 'services/UserService/Logic/downgradeToFree';
import { pmLanding } from 'utils/functions/postMessage';
import { getActionType } from 'wiloke-react-core/utils';
import { downgradeToFreePlan } from '../actions';

function* handleAction({ payload: { planHandle } }: ReturnType<typeof downgradeToFreePlan.request>) {
  try {
    const response: SagaReturnType<typeof downgradeToFreeService> = yield retry(3, 1000, downgradeToFreeService);
    yield put(downgradeToFreePlan.success({ planHandle, confirmation_url: response.info.confirmation_url }));
    pmLanding.emit('@landing/plan/success');
  } catch (error) {
    yield put(downgradeToFreePlan.failure({ planHandle }));
    pmLanding.emit('@landing/plan/failure');
  }
}

export function* watchDowngradeToFree() {
  yield takeLatest(getActionType(downgradeToFreePlan.request), handleAction);
}
