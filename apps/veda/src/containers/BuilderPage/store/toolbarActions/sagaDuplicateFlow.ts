import { notification } from 'antd';
import { delay, put, select, takeLatest } from 'redux-saga/effects';
import { duplicateSection } from 'store/actions/actionPages';
import { setSectionIdActive } from 'store/actions/actionSectionIdActive';
import { setSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { duplicateAddon, ThemeAddonsState } from 'store/global/themeAddons';
import { themeAddonsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { v4 } from 'uuid';
import { getActionType } from 'wiloke-react-core/utils';
import { cancelModalDuplicateFlow, sectionDuplicateFlow, SectionDuplicateFlowParams, sectionModalDuplicateFlow } from './action';
import getSectionActive from './getSectionActiveForSaga';
import handleSetAddonsToKeep from './handleSetAddonsToKeep';
import { AddonsToKeepItem, addonsToKeepSelector, setAddonsToKeep } from './sliceAddonsToKeep';
import { modalDuplicateVisibleSelector, ModalDuplicateVisibleState, setModalDuplicateVisible } from './sliceModalDuplicateVisible';

function* handleCancelModalDuplicate() {
  yield put(setModalDuplicateVisible({ visible: false, sectionId: '' }));
  yield put(setAddonsToKeep([]));
}

function* handleSectionDuplicateHasAddons(payload: SectionDuplicateFlowParams) {
  const { sectionIdActive, goBack } = payload;
  const sectionActive: PageSection = yield getSectionActive(sectionIdActive);
  const themeAddons: ThemeAddonsState = yield select(themeAddonsSelector);
  // Nếu bấm duplicate những section có chứa addons
  if (!!sectionActive.addonIds?.length) {
    yield put(setModalDuplicateVisible({ visible: true, sectionId: sectionIdActive }));
    yield handleSetAddonsToKeep(sectionActive, true, goBack);
  } else {
    // Bấm duplicate những section không có addons
    const canAddMultiple = !!themeAddons.data.find(item => item.sectionId === sectionIdActive)?.canAddMulti;
    // Nếu canAddMulti false và section là dạng addons thì sẽ không cho duplicate
    if (!canAddMultiple && isSectionAddons(sectionActive?.type)) {
      notification.error({
        message: i18n.t('builderPage.cannot_duplicate'),
        placement: 'topLeft',
      });
      return;
    }
    // Id này dành cho trường id trong cho section addons và sectionId + body.id trong theme addons
    const newId = `id_${v4()}`;
    if (isSectionAddons(sectionActive?.type)) {
      yield put(duplicateAddon({ addonsSectionId: sectionIdActive, newId }));
    }
    yield put(duplicateSection({ sectionId: sectionIdActive, newId }));
    yield put(setSectionIdActive(''));
    payload.goBack();
    pmParent.emit('@section/sectionIdActive', '');
    yield delay(0);
    yield put(setSectionEdittingId(''));
  }
}

function* handleModalDuplicateFlow({ payload }: ReturnType<typeof sectionModalDuplicateFlow>) {
  const addonsToKeep: AddonsToKeepItem[] = yield select(addonsToKeepSelector);
  const { sectionId }: ModalDuplicateVisibleState = yield select(modalDuplicateVisibleSelector);
  const newSectionId = `id_${v4()}`;
  const newAddonIds: string[] = [];
  for (const item of addonsToKeep) {
    const { addonId, active } = item;
    if (active) {
      // Duplicate addons tại sections
      yield put(duplicateSection({ sectionId: addonId, newId: addonId }));
      newAddonIds.push(addonId);
    }
  }
  // Duplicate section mới
  if (newAddonIds.length === 0) {
    yield put(duplicateSection({ sectionId, newId: newSectionId }));
  } else {
    yield put(duplicateSection({ sectionId, newId: newSectionId, newAddonIds, keepAddons: true }));
  }
  yield put(setSectionIdActive(''));
  payload.goBack();
  pmParent.emit('@section/sectionIdActive', '');
  yield delay(0);
  yield put(setSectionEdittingId(''));
  yield handleCancelModalDuplicate();
}

function* handleSectionDuplicate(payload: SectionDuplicateFlowParams) {
  const { sectionIdActive } = payload;
  const sectionActive: PageSection = yield getSectionActive(sectionIdActive);
  const themeAddons: ThemeAddonsState = yield select(themeAddonsSelector);
  const canAddMultiple = !!themeAddons.data.find(item => item.sectionId === sectionIdActive)?.canAddMulti;
  // Nếu canAddMulti false và section là dạng addons thì sẽ không cho duplicate
  if (!canAddMultiple && isSectionAddons(sectionActive?.type)) {
    notification.error({
      message: i18n.t('builderPage.cannot_duplicate'),
      placement: 'topLeft',
    });
    return;
  }
  // Id này dành trường id trong cho section addons và sectionId + body.id trong theme addons
  const newId = `id_${v4()}`;
  if (isSectionAddons(sectionActive?.type)) {
    yield put(duplicateAddon({ addonsSectionId: sectionIdActive, newId }));
  }
  yield put(duplicateSection({ sectionId: sectionIdActive, newId }));
  yield put(setSectionIdActive(''));
  payload.goBack();
  pmParent.emit('@section/sectionIdActive', '');
  yield delay(0);
  yield put(setSectionEdittingId(''));
}

function* handleSwitchFlow(action: ReturnType<typeof sectionDuplicateFlow>) {
  const { sectionIdActive } = action.payload;
  const sectionActive: PageSection = yield getSectionActive(sectionIdActive);
  if (sectionActive.addonIds?.length) {
    yield handleSectionDuplicateHasAddons(action.payload);
  } else {
    yield handleSectionDuplicate(action.payload);
  }
}

/**
 * @description Bấm vào nút modal ok khi duplicate vào section có chứa addons
 */
export function* watchSectionModalDuplicateFlow() {
  yield takeLatest(getActionType(sectionModalDuplicateFlow), handleModalDuplicateFlow);
}

/**
 * @description Bấm vào nút duplicate và section không chứa addons
 */
export function* watchSectionDuplicateFlow() {
  yield takeLatest(getActionType(sectionDuplicateFlow), handleSwitchFlow);
}

/**
 * @description Bấm vào nút cancel modal
 */
export function* watchCancelModalDuplicateFlow() {
  yield takeLatest(getActionType(cancelModalDuplicateFlow), handleCancelModalDuplicate);
}
