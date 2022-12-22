import { retry, put, select, takeEvery } from 'redux-saga/effects';
import { Role } from 'routes/types';
import { mediaService } from 'services/MediaService';
import { authSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionUploadFileToMyMedia } from '../actions/actionMyMedia';

export function* handleUploadFileToMyMedia({ payload }: ReturnType<typeof actionUploadFileToMyMedia.request>) {
  const { role }: ReturnType<typeof authSelector> = yield select(authSelector);
  try {
    const res: Awaited<ReturnType<typeof mediaService.uploadFileToMyMedia>> = yield retry(
      3,
      1000,
      mediaService.uploadFileToMyMedia,
      { file: payload.file },
      role as Role,
    );
    yield put(actionUploadFileToMyMedia.success({ data: res, uniqId: payload.uniqId }));
    payload.onSuccess?.(res);
  } catch (err) {
    yield put(
      actionUploadFileToMyMedia.failure({
        message: notifyAxiosHandler.handleErrorDetail({
          error: err,
        }),
        uniqId: payload.uniqId,
      }),
    );
    payload.onFailure?.((err as Error).message);
  }
}

export function* watchUploadFileToMyMedia() {
  yield takeEvery(getActionType(actionUploadFileToMyMedia.request), handleUploadFileToMyMedia);
}
