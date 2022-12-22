import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { createPlanService } from 'services/UserService/Logic/createPlan';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createUserPlan } from '../actions';
import { setVisibleModalCreatePlan } from '../slicePlan';

function* handleAction({ payload: { data, onFulfill } }: ReturnType<typeof createUserPlan.request>) {
  try {
    const response: SagaReturnType<typeof createPlanService> = yield retry(3, 1000, createPlanService, data);
    yield put(createUserPlan.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setVisibleModalCreatePlan(false));
    onFulfill?.();
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(createUserPlan.failure(undefined));
  }
}

export function* watchCreateUserPlan() {
  yield takeLatest(getActionType(createUserPlan.request), handleAction);
}
