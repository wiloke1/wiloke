import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { getActionType } from 'wiloke-react-core/utils';
import { createEnvatoCategory } from '../../actions/sections/user.actionEnvato';

function* handleCreate({ payload: { description, name, envatoItemId } }: ReturnType<typeof createEnvatoCategory.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.envato.createProduct> = yield retry(3, 1000, sectionService.envato.createProduct, {
      description,
      name,
      envatoItemId,
    });
    yield put(createEnvatoCategory.success(response.info));
  } catch (error) {
    yield put(createEnvatoCategory.failure(undefined));
  }
}

export function* watchCreateEnvatoCategory() {
  yield takeLatest(getActionType(createEnvatoCategory.request), handleCreate);
}
