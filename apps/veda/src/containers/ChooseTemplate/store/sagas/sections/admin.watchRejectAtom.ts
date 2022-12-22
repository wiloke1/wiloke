import { retry, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectAdminSection, setCurrentAdminSection } from '../../actions';

function* handleRejectAtom({ payload: { commandId, assignTo, comment } }: ReturnType<typeof rejectAdminSection.request>) {
  try {
    const responseReject: Awaited<ReturnType<typeof sectionService.sections.rejectAtom>> = yield retry(
      3,
      1000,
      sectionService.sections.rejectAtom,
      commandId,
      assignTo,
      comment,
    );

    yield put(rejectAdminSection.success({ commandId }));
    notifyAxiosHandler.handleSuccess(responseReject.message);
    yield put(setCurrentAdminSection(undefined));
  } catch (error) {
    console.log(error);
    yield put(rejectAdminSection.failure({ commandId }));
  }
}

export function* watchRejectAtom() {
  yield takeLatest(getActionType(rejectAdminSection.request), handleRejectAtom);
}
