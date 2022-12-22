import { put, retry, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteDraftSection } from '../../actions';

function* handleDelete({ payload: { section } }: ReturnType<typeof deleteDraftSection.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.deleteDraftSection>> = yield retry(
      3,
      1000,
      sectionService.sections.deleteDraftSection,
      section.commandId,
    );
    if (section.megaMenuCommandIds && section.megaMenuCommandIds.length > 0) {
      yield retry(3, 1000, sectionService.megaMenus.deleteListMegaMenuOfDraft, { listIds: section.megaMenuCommandIds });
    }
    yield put(deleteDraftSection.success({ commandId: section.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteDraftSection.failure({ commandId: section.commandId }));
  }
}

export function* watchDeleteDraftSection() {
  yield takeLatest(getActionType(deleteDraftSection.request), handleDelete);
}
