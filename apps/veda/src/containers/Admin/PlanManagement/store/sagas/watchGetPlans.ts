import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { getPlansService } from 'services/UserService/Logic/getPlans';
import { getActionType } from 'wiloke-react-core/utils';
import { getUserPlans } from '../actions';
import { planSelector } from '../slicePlan';

function* handleAction() {
  try {
    const { getStatus, plans }: ReturnType<typeof planSelector> = yield select(planSelector);
    if (getStatus === 'success') {
      yield put(getUserPlans.success({ data: plans }));
    } else {
      const response: SagaReturnType<typeof getPlansService> = yield retry(3, 1000, getPlansService);
      yield put(getUserPlans.success({ data: response.info }));
    }
  } catch (error) {
    yield put(getUserPlans.failure(undefined));
  }
}

export function* watchGetUserPlans() {
  yield takeLatest(getActionType(getUserPlans.request), handleAction);
}
