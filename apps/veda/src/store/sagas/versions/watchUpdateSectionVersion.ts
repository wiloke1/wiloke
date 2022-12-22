import { call, put, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { sectionService } from 'services/SectionService';
import { setModalUpdateAddon, setModalUpdateSection, updateAddonVersion, updateSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleUpdateSection({ payload }: ReturnType<typeof updateSectionVersion.request>) {
  const { id } = payload;
  try {
    const response: Awaited<ReturnType<typeof sectionService.sections.getAtomSection>> = yield call(sectionService.sections.getAtomSection, id);
    yield put(updateSectionVersion.success({ updatedItem: response }));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);
    yield put(setModalUpdateSection(undefined));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(updateSectionVersion.failure(undefined));
  }
}

function* handleUpdateAddon({ payload }: ReturnType<typeof updateAddonVersion.request>) {
  const { id, prevAddonSection } = payload;
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.getAtom>> = yield call(addonService.addons.getAtom, id);
    const responseSuccess: typeof response = {
      ...response,
      sectionId: prevAddonSection.id,
      body: {
        ...response.body,
        id: prevAddonSection.id,
      },
    };

    yield put(updateAddonVersion.success({ updatedAddon: responseSuccess }));
    yield put(setModalUpdateAddon(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(updateAddonVersion.failure(undefined));
  }
}

export function* watchUpdateSectionVersion() {
  yield takeLatest(getActionType(updateSectionVersion.request), handleUpdateSection);
}

export function* watchUpdateAddonVersion() {
  yield takeLatest(getActionType(updateAddonVersion.request), handleUpdateAddon);
}
