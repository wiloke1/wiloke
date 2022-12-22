import { put, retry, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteProductSection } from '../../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteProductSection.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.deleteProductSection>> = yield retry(
      3,
      1000,
      sectionService.sections.deleteProductSection,
      commandId,
    );
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(deleteProductSection.success({ commandId }));
  } catch (error) {
    yield put(deleteProductSection.failure({ commandId }));
  }
}

export function* watchDeleteProductSection() {
  yield takeLatest(getActionType(deleteProductSection.request), handleDelete);
}
