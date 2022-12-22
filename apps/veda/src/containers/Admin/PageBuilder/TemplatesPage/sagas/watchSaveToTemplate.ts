import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { savePageToFavorite } from 'services/PageService/Logic/saveToFavorite';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveToMyTemplate } from '../reducers/actions';

function* handleSavePage({ payload }: ReturnType<typeof saveToMyTemplate.request>) {
  const { categories, image, name, parentCommandId, pageType } = payload;
  try {
    const response: SagaReturnType<typeof savePageToFavorite> = yield retry(3, 1000, savePageToFavorite, {
      categories,
      image,
      name,
      parentCommandId,
      pageType,
    });
    yield put(saveToMyTemplate.success({ parentCommandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(saveToMyTemplate.failure({ parentCommandId }));
  }
}

export function* watchSaveToTemplate() {
  yield takeLatest(getActionType(saveToMyTemplate.request), handleSavePage);
}
