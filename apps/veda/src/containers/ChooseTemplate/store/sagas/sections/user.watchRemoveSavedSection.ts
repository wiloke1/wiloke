import { removeSavedSection } from 'containers/ChooseTemplate/store/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleSections({ payload }: ReturnType<typeof removeSavedSection.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.deleteFavorite>> = yield call(sectionService.sections.deleteFavorite, {
      commandId: payload.id,
    });
    yield put(removeSavedSection.success({ id: payload.id }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    console.log(error);
    yield put(removeSavedSection.failure({ id: payload.id }));
  }
}

export function* watchRemoveSavedSection() {
  yield takeLatest(getActionType(removeSavedSection.request), handleSections);
}
