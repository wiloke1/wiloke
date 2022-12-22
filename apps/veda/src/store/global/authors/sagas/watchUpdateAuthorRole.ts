import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { updateRoleAuthor } from 'services/UserService/Logic/updateRoleAthor';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAuthorRole } from '../action';

function* handleUpdate({ payload: { role, userId } }: ReturnType<typeof updateAuthorRole.request>) {
  try {
    const response: SagaReturnType<typeof updateRoleAuthor> = yield retry(3, 1000, updateRoleAuthor, { role, userId });
    yield put(updateAuthorRole.success({ userId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(updateAuthorRole.failure({ userId }));
  }
}

export function* watchUpdateAuthorRole() {
  yield takeLatest(getActionType(updateAuthorRole.request), handleUpdate);
}
