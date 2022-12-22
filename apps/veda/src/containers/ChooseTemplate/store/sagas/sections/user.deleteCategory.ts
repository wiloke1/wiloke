import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteProductCategory } from '../../actions';

function* handleAction({ payload: { commandId } }: ReturnType<typeof deleteProductCategory.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.categories.deleteCategoryOfProduct> = yield retry(
      3,
      1000,
      sectionService.categories.deleteCategoryOfProduct,
      commandId,
    );
    yield put(deleteProductCategory.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteProductCategory.failure({ commandId }));
  }
}

export function* watchDeleteProductCategory() {
  yield takeLatest(getActionType(deleteProductCategory.request), handleAction);
}
