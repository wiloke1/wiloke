import { retry, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { forkSectionAdminToDraft } from '../../actions';

function* handleFork({ payload: { commandId } }: ReturnType<typeof forkSectionAdminToDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.forkAtom>> = yield retry(3, 1000, sectionService.sections.forkAtom, commandId);
    yield put(forkSectionAdminToDraft.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(forkSectionAdminToDraft.failure({ commandId }));
  }
}

export function* watchForkAdminSectionToDraft() {
  yield takeLatest(getActionType(forkSectionAdminToDraft.request), handleFork);
}
