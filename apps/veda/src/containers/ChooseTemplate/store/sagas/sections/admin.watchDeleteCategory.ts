import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAdminCategory } from '../../actions';

function* handleAction({ payload: { commandId } }: ReturnType<typeof deleteAdminCategory.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.categories.deleteCategoryOfAtom> = yield retry(
      3,
      1000,
      sectionService.categories.deleteCategoryOfAtom,
      commandId,
    );
    yield put(deleteAdminCategory.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteAdminCategory.failure({ commandId }));
  }
}

export function* watchDeleteAdminCategory() {
  yield takeLatest(getActionType(deleteAdminCategory.request), handleAction);
}
