import { retry, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { approveSectionToAdmin } from '../../actions';

function* handleApproveSectionToAdmin({ payload: { commandId } }: ReturnType<typeof approveSectionToAdmin.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.approveDraftToAdmin>> = yield retry(
      3,
      1000,
      sectionService.sections.approveDraftToAdmin,
      commandId,
    );
    yield put(approveSectionToAdmin.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(approveSectionToAdmin.failure({ commandId: commandId }));
  }
}

export function* watchApproveSectionToAdmin() {
  yield takeLatest(getActionType(approveSectionToAdmin.request), handleApproveSectionToAdmin);
}
