import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { freeImageService } from 'services/MediaService/FreeImageService';
import { getActionType } from 'wiloke-react-core/utils';
import { getFreeImages } from '../actions/actionGetFreeImages';

function* handleAction({ payload: { category, search } }: ReturnType<typeof getFreeImages.request>) {
  try {
    const response: SagaReturnType<typeof freeImageService.getFreeImages> = yield retry(3, 1000, freeImageService.getFreeImages, {
      category: category?.toLocaleLowerCase() === 'all' ? '' : category,
      search,
      offset: 0,
    });

    yield put(
      getFreeImages.success({
        data: response.data,
        hasNextPage: typeof response.metadata.paging.next === 'string' && response.metadata.paging.next !== '',
      }),
    );
  } catch (error) {
    console.log(error);
    yield put(getFreeImages.failure(undefined));
  }
}

export function* watchGetFreeImages() {
  yield takeLatest(getActionType(getFreeImages.request), handleAction);
}
