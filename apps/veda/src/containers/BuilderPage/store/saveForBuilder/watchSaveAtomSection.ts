import { AxiosError } from 'axios';
import { createPublishStepLoading } from 'components/PublishStepLoading';
import { Task } from 'redux-saga';
import { all, call, cancel, delay, fork, put, retry, SagaReturnType, select, take } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, changeSection, setSectionLabel } from 'store/actions/actionPages';
import { pageSectionsSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { AdminSection } from 'types/Sections';
import { deepFind } from 'utils/functions/deepFind';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveAtomSection } from './actions';
import { setModalAdminMegaMenuVisible, setModalAdminSectionVisible, setModalDevMegaMenuVisible, setModalDevSectionVisible } from './slice';

export const notifySaveSection = createPublishStepLoading(2);

function* saveSectionRequest(data: AdminSection, type: 'create' | 'update') {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  if (type === 'create') {
    const megaMenuIds = deepFind(data, 'megaMenuId');
    let megaMenus: AdminSection[] = [];
    if (megaMenuIds.length > 0) {
      const megaMenuSection = pageSections.filter(item => megaMenuIds.includes(item.id));
      const responseMegaMenusOfAtom: SagaReturnType<typeof sectionService.megaMenus.createListMegaMenuOfAtom> = yield retry(
        3,
        1000,
        sectionService.megaMenus.createListMegaMenuOfAtom,
        megaMenuSection as AdminSection[],
      );
      megaMenus = responseMegaMenusOfAtom.info;
      yield put(addMegaMenusToPage(megaMenus));
      notifySaveSection.next({
        title: 'Saving mega menu...',
        description: responseMegaMenusOfAtom.message,
      });
    }
    const megaMenuCommandIds = megaMenus.map(item => item.commandId).filter(Boolean);

    const response: Awaited<ReturnType<typeof sectionService.sections.createAtomSection>> = yield retry(
      3,
      1000,
      sectionService.sections.createAtomSection,
      { ...data, commandId: undefined, megaMenuCommandIds },
    );
    return response;
  } else {
    const megaMenuIds = deepFind(data, 'megaMenuId');
    let megaMenus: AdminSection[] = [];
    if (megaMenuIds.length > 0) {
      const megaMenuSection = pageSections.filter(item => megaMenuIds.includes(item.id));
      const megaMenuResponse: Array<SagaReturnType<
        typeof sectionService.megaMenus.updateMegaMenuOfAtom | typeof sectionService.megaMenus.createMegaMenuOfAtom
      >> = yield all(
        megaMenuSection.map(megaMenu => {
          if (megaMenu.commandId) {
            return retry(3, 1000, sectionService.megaMenus.updateMegaMenuOfAtom, megaMenu as AdminSection);
          } else {
            return retry(3, 1000, sectionService.megaMenus.createMegaMenuOfAtom, megaMenu as AdminSection);
          }
        }),
      );
      megaMenus = megaMenuResponse.map(mega => mega.info);
      yield put(addMegaMenusToPage(megaMenus));
      notifySaveSection.next({
        title: 'Saving mega menu...',
        description: 'Save mega menu successful',
      });
    }

    const megaMenuCommandIds = megaMenus.map(item => item.commandId).filter(Boolean);

    const response: Awaited<ReturnType<typeof sectionService.sections.updateAtomSection>> = yield retry(
      3,
      1000,
      sectionService.sections.updateAtomSection,
      { ...data, megaMenuCommandIds },
    );
    return response;
  }
}

function* handleSaveAtomSection({ payload }: ReturnType<typeof saveAtomSection.request>) {
  const { data, type } = payload;

  try {
    const sectionIdCodeVisible: string = yield select(sectionIdCodeVisibleSelector);
    const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

    const response: SagaReturnType<typeof saveSectionRequest> = yield call(saveSectionRequest, data, type);
    const currentIndex = pageSections.findIndex(item => item.id === response.info.id);
    yield put(changeSection(currentIndex, response.info));
    yield put(saveAtomSection.success(undefined));

    notifySaveSection.next({
      title: 'Saving section...',
      description: response.message,
    });

    yield delay(200);
    notifySaveSection.done();

    yield put(setSectionLabel(sectionIdCodeVisible, data.label));
    yield put(setModalDevSectionVisible(false));
    yield put(setModalDevMegaMenuVisible(false));
    yield put(setModalAdminSectionVisible(false));
    yield put(setModalAdminMegaMenuVisible(false));
  } catch (error) {
    yield put(saveAtomSection.failure(undefined));
    notifySaveSection.done();
    yield delay(300);
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
  }
}

let saveSectionTask: Task | undefined;

export function* watchSaveAtomSection() {
  while (true) {
    const requestAction: ReturnType<typeof saveAtomSection.request> = yield take(getActionType(saveAtomSection.request));
    if (!!saveSectionTask) {
      yield cancel(saveSectionTask);
    }
    saveSectionTask = yield fork(handleSaveAtomSection, requestAction);
  }
}

export function* watchCancelSaveAtomSection() {
  while (true) {
    const cancelAction: ReturnType<typeof saveAtomSection.cancel> = yield take(getActionType(saveAtomSection.cancel));
    if (cancelAction.type === '@BuilderPage/saveAtomSection/cancel' && !!saveSectionTask) {
      yield cancel(saveSectionTask);
    }
  }
}
