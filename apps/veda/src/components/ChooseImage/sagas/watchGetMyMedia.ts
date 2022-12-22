import { retry, put, select, takeLatest } from 'redux-saga/effects';
import { Role } from 'routes/types';
import { mediaService } from 'services/MediaService';
import { authSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetMyMedia } from '../actions/actionMyMedia';

export const posts_per_page = 50;

function* handleGetMyMedia({ payload: { date, name } }: ReturnType<typeof actionGetMyMedia.request>) {
  try {
    const { role }: ReturnType<typeof authSelector> = yield select(authSelector);

    const { lastCursor, medias, hasNextPage }: Awaited<ReturnType<typeof mediaService.getMyMedia>> = yield retry(
      3,
      1000,
      mediaService.getMyMedia,
      undefined,
      role as Role,
      name,
      date,
    );

    yield put(actionGetMyMedia.success({ lastCursor, data: medias, hasNextPage }));
  } catch (err) {
    yield put(
      actionGetMyMedia.failure({
        message: notifyAxiosHandler.handleErrorDetail({
          error: err,
          showNotification: true,
          fileDetail: 'watchGetMyMedia',
        }),
      }),
    );
  }
}

export function* watchGetMyMedia() {
  yield takeLatest(getActionType(actionGetMyMedia.request), handleGetMyMedia);
}
