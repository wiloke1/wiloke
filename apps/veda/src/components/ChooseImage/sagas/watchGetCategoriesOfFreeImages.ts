import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { freeImageService } from 'services/MediaService/FreeImageService';
import { getActionType } from 'wiloke-react-core/utils';
import { getCategoriesOfFreeImages } from '../actions/actionGetFreeImages';
import { imageGallerySelector } from '../selector';

function* handleAction(_: ReturnType<typeof getCategoriesOfFreeImages.request>) {
  try {
    const {
      free_images: { getCategoriesStatus, categories },
    }: ReturnType<typeof imageGallerySelector> = yield select(imageGallerySelector);

    if (getCategoriesStatus === 'success') {
      yield put(getCategoriesOfFreeImages.success({ data: categories }));
    } else {
      const response: SagaReturnType<typeof freeImageService.getCategoriesOfFreeImage> = yield retry(
        3,
        1000,
        freeImageService.getCategoriesOfFreeImage,
      );
      yield put(getCategoriesOfFreeImages.success({ data: response.data }));
    }
  } catch (error) {
    yield put(getCategoriesOfFreeImages.failure(undefined));
  }
}

export function* watchGetCategoriesOfFreeImages() {
  yield takeLatest(getActionType(getCategoriesOfFreeImages.request), handleAction);
}
