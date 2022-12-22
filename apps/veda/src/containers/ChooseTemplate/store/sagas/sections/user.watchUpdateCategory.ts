import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateProductCategory } from '../../actions';

function* handleAction({ payload: { commandId, description, name } }: ReturnType<typeof updateProductCategory.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.categories.updateCategoryOfProduct> = yield retry(
      3,
      1000,
      sectionService.categories.updateCategoryOfProduct,
      {
        commandId,
        description,
        name,
      },
    );
    yield put(updateProductCategory.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(updateProductCategory.failure({ commandId }));
  }
}

export function* watchUpdateProductCategory() {
  yield takeLatest(getActionType(updateProductCategory.request), handleAction);
}
