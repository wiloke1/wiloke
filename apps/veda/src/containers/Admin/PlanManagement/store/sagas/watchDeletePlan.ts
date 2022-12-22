import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { deletePlanService } from 'services/UserService/Logic/deletePlan';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteUserPlan } from '../actions';

function* handleAction({ payload: { commandId } }: ReturnType<typeof deleteUserPlan.request>) {
  try {
    const response: SagaReturnType<typeof deletePlanService> = yield retry(3, 1000, deletePlanService, { commandId });
    yield put(deleteUserPlan.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(deleteUserPlan.failure({ commandId }));
  }
}

export function* watchDeletePlan() {
  yield takeLatest(getActionType(deleteUserPlan.request), handleAction);
}
