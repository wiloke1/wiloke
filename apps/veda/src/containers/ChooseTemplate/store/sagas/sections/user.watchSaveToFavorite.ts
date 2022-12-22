import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveSection } from '../../actions';

function* handleAction({ payload: { id, categories, name, image } }: ReturnType<typeof saveSection.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.sections.saveToFavorite> = yield retry(3, 1000, sectionService.sections.saveToFavorite, {
      categories,
      name,
      parentCommandId: id,
      image,
    });
    yield put(saveSection.success({ id }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(saveSection.failure({ id }));
  }
}

export function* watchSaveToFavorite() {
  yield takeLatest(getActionType(saveSection.request), handleAction);
}
