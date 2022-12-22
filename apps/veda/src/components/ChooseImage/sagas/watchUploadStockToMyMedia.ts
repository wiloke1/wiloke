import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Role } from 'routes/types';
import { mediaService } from 'services/MediaService';
import { authSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionUploadStockToMyMedia } from '../actions/actionMyMedia';

function* handleUploadStockToMyMedia({ payload }: ReturnType<typeof actionUploadStockToMyMedia.request>) {
  const { role }: ReturnType<typeof authSelector> = yield select(authSelector);

  try {
    const res: Awaited<ReturnType<typeof mediaService.uploadStockToMyMedia>> = yield call(
      mediaService.uploadStockToMyMedia,
      { src: payload.src },
      role as Role,
    );
    yield put(
      actionUploadStockToMyMedia.success({
        data: res,
        src: payload.src,
      }),
    );
    payload.onSuccess(res);
  } catch (err) {
    yield put(
      actionUploadStockToMyMedia.failure({
        message: notifyAxiosHandler.handleErrorDetail({ error: err }),
        src: payload.src,
      }),
    );
    payload.onFailure((err as Error).message);
  }
}

export function* watchUploadStockToMyMedia() {
  yield takeEvery(getActionType(actionUploadStockToMyMedia.request), handleUploadStockToMyMedia);
}
