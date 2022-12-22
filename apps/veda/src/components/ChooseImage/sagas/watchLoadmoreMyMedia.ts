import { retry, put, select, takeLeading } from 'redux-saga/effects';
import { Role } from 'routes/types';
import { mediaService } from 'services/MediaService';
import { authSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreMyMedia } from '../actions/actionMyMedia';

function* handleLoadmoreMyMedia({ payload: { date, name } }: ReturnType<typeof actionLoadMoreMyMedia.request>) {
  try {
    const { role }: ReturnType<typeof authSelector> = yield select(authSelector);
    const lastCursorSelector: AppState['imageGallery']['my_media']['lastCursor'] = yield select(
      (state: AppState) => state.imageGallery.my_media.lastCursor,
    );
    if (lastCursorSelector) {
      const { lastCursor, medias, hasNextPage }: Awaited<ReturnType<typeof mediaService.getMyMedia>> = yield retry(
        3,
        1000,
        mediaService.getMyMedia,
        lastCursorSelector,
        role as Role,
        name,
        date,
      );
      yield put(actionLoadMoreMyMedia.success({ lastCursor, data: medias, hasNextPage }));
    }
  } catch (err) {
    yield put(
      actionLoadMoreMyMedia.failure({
        message: notifyAxiosHandler.handleErrorDetail({
          error: err,
          showNotification: true,
          fileDetail: 'watchLoadmoreMyMedia',
        }),
      }),
    );
  }
}

export function* watchLoadmoreMyMedia() {
  yield takeLeading(getActionType(actionLoadMoreMyMedia.request), handleLoadmoreMyMedia);
}
