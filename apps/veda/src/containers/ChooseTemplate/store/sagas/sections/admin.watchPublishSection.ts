import { AxiosError } from 'axios';
import { retry, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler, ErrorData } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { publishAdminSectionToProduct, setSettingsAdminSection } from '../../actions';

function* handlePublishAdminSection({ payload: { section } }: ReturnType<typeof publishAdminSectionToProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.publishAtomToProduct>> = yield retry(
      3,
      1000,
      sectionService.sections.publishAtomToProduct,
      section,
    );
    yield put(publishAdminSectionToProduct.success(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setSettingsAdminSection({ sectionId: '', visible: false }));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(publishAdminSectionToProduct.failure(undefined));
  }
}

export function* watchPublishAdminSection() {
  yield takeLatest(getActionType(publishAdminSectionToProduct.request), handlePublishAdminSection);
}
