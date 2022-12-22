import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { freeImageService } from 'services/MediaService/FreeImageService';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMoreFreeImages } from '../actions/actionGetFreeImages';
import { imageGallerySelector } from '../selector';

function* handleAction({ payload: { category, search } }: ReturnType<typeof loadMoreFreeImages.request>) {
  try {
    const {
      free_images: { offset },
    }: ReturnType<typeof imageGallerySelector> = yield select(imageGallerySelector);
    const response: SagaReturnType<typeof freeImageService.getFreeImages> = yield retry(3, 1000, freeImageService.getFreeImages, {
      category: category?.toLocaleLowerCase() === 'all' ? '' : category,
      search,
      offset,
    });
    yield put(
      loadMoreFreeImages.success({
        data: response.data,
        hasNextPage: typeof response.metadata.paging.next === 'string' && response.metadata.paging.next !== '',
      }),
    );
  } catch (error) {
    yield put(loadMoreFreeImages.failure(undefined));
  }
}

export function* watchLoadMoreFreeImages() {
  yield takeLatest(getActionType(loadMoreFreeImages.request), handleAction);
}
