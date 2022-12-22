import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { updatePlanService } from 'services/UserService/Logic/updatePlan';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateUserPlan } from '../actions';
import { setEditPlan } from '../slicePlan';

function* handleAction({ payload: params }: ReturnType<typeof updateUserPlan.request>) {
  try {
    const response: SagaReturnType<typeof updatePlanService> = yield retry(3, 1000, updatePlanService, params);
    yield put(updateUserPlan.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setEditPlan(undefined));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(updateUserPlan.failure(params));
  }
}

export function* watchUpdateUserPlan() {
  yield takeLatest(getActionType(updateUserPlan.request), handleAction);
}
