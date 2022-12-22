import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { getActionType } from 'wiloke-react-core/utils';
import { getEnvatoCategories } from '../../actions/sections/user.actionEnvato';

function* handleGet() {
  try {
    const response: SagaReturnType<typeof sectionService.envato.getProducts> = yield retry(3, 1000, sectionService.envato.getProducts);
    yield put(getEnvatoCategories.success({ data: response.info }));
  } catch (error) {
    yield put(getEnvatoCategories.failure(undefined));
  }
}

export function* watchGetEnvatoCategories() {
  yield takeLatest(getActionType(getEnvatoCategories.request), handleGet);
}
