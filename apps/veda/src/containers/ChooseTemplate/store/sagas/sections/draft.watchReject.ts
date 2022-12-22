import { retry, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectDraftSection } from '../../actions';

function* handleRejectDraft({ payload: { section } }: ReturnType<typeof rejectDraftSection.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.rejectDraft>> = yield retry(
      3,
      1000,
      sectionService.sections.rejectDraft,
      section,
    );
    yield put(rejectDraftSection.success({ commandId: section.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(rejectDraftSection.failure({ commandId: section.commandId }));
  }
}

export function* watchRejectDraftSection() {
  yield takeLatest(getActionType(rejectDraftSection.request), handleRejectDraft);
}
