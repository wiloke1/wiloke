import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAdminCategory } from '../../actions';

function* handleAction({ payload: { commandId, description, name } }: ReturnType<typeof updateAdminCategory.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.categories.updateCategoryOfAtom> = yield retry(
      3,
      1000,
      sectionService.categories.updateCategoryOfAtom,
      {
        commandId,
        description,
        name,
      },
    );

    yield put(updateAdminCategory.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(updateAdminCategory.failure({ commandId }));
  }
}

export function* watchUpdateAdminCategory() {
  yield takeLatest(getActionType(updateAdminCategory.request), handleAction);
}
