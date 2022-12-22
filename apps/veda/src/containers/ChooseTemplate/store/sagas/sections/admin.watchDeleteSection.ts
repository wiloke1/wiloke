import { put, retry, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAdminSection } from '../../actions';

function* handleDelete({ payload: { section } }: ReturnType<typeof deleteAdminSection.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.deleteAtomSection>> = yield retry(
      3,
      1000,
      sectionService.sections.deleteAtomSection,
      section.commandId,
    );

    yield put(deleteAdminSection.success({ commandId: section.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(deleteAdminSection.failure({ commandId: section.commandId }));
  }
}

export function* watchDeleteAdminSection() {
  yield takeLatest(getActionType(deleteAdminSection.request), handleDelete);
}
