import { put, retry, SagaReturnType, select, takeEvery } from 'redux-saga/effects';
import { Role } from 'routes/types';
import { mediaService } from 'services/MediaService';
import { authSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionDeleteMyMedia } from '../actions/actionMyMedia';

function* handleDeleteMyMedia({ payload }: ReturnType<typeof actionDeleteMyMedia.request>) {
  const { role }: ReturnType<typeof authSelector> = yield select(authSelector);
  try {
    const { message }: SagaReturnType<typeof mediaService.deleteMyMedia> = yield retry(3, 1000, mediaService.deleteMyMedia, payload.id, role as Role);
    yield put(actionDeleteMyMedia.success({ id: payload.id }));
    notifyAxiosHandler.handleSuccess(message);
  } catch (err) {
    yield put(actionDeleteMyMedia.failure({ id: payload.id }));
  }
}

export function* watchDeleteMyMedia() {
  yield takeEvery(getActionType(actionDeleteMyMedia.request), handleDeleteMyMedia);
}
