import { AxiosError } from 'axios';
import { Task } from 'redux-saga';
import { all, call, cancel, delay, fork, put, retry, SagaReturnType, select, take } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, changeSection, setSectionLabel } from 'store/actions/actionPages';
import { pageSectionsSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { DevSection } from 'types/Sections';
import { deepFind } from 'utils/functions/deepFind';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveDraftSection } from './actions';
import { setModalAdminSectionVisible, setModalDevSectionVisible } from './slice';
import { notifySaveSection } from './watchSaveAtomSection';

function* saveSectionRequest(data: DevSection, type: 'create' | 'update') {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  if (type === 'create') {
    const megaMenuIds = deepFind(data, 'megaMenuId');
    let megaMenus: DevSection[] = [];
    if (megaMenuIds.length > 0) {
      const megaMenuSection = pageSections.filter(item => megaMenuIds.includes(item.id));
      const responseMegaMenusOfDraft: SagaReturnType<typeof sectionService.megaMenus.createListMegaMenuOfDraft> = yield retry(
        3,
        1000,
        sectionService.megaMenus.createListMegaMenuOfDraft,
        megaMenuSection as DevSection[],
      );
      megaMenus = responseMegaMenusOfDraft.info;
      yield put(addMegaMenusToPage(megaMenus));
      notifySaveSection.next({
        title: 'Saving mega menu...',
        description: responseMegaMenusOfDraft.message,
      });
    }
    const megaMenuCommandIds = megaMenus.map(item => item.commandId).filter(Boolean);

    const response: SagaReturnType<typeof sectionService.sections.createDraftSection> = yield retry(
      3,
      1000,
      sectionService.sections.createDraftSection,
      { ...data, megaMenuCommandIds },
    );
    return response;
  } else {
    const megaMenuIds = deepFind(data, 'megaMenuId');
    let megaMenus: DevSection[] = [];
    if (megaMenuIds.length > 0) {
      const megaMenuSection = pageSections.filter(item => megaMenuIds.includes(item.id));

      const megaMenuResponse: Array<SagaReturnType<
        typeof sectionService.megaMenus.updateMegaMenuOfDraft | typeof sectionService.megaMenus.createMegaMenuOfDraft
      >> = yield all(
        megaMenuSection.map(megaMenu => {
          if (megaMenu.commandId) {
            return retry(3, 1000, sectionService.megaMenus.updateMegaMenuOfDraft, megaMenu as DevSection);
          } else {
            return retry(3, 1000, sectionService.megaMenus.createMegaMenuOfDraft, megaMenu as DevSection);
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

    const response: SagaReturnType<typeof sectionService.sections.updateDraftSection> = yield retry(
      3,
      1000,
      sectionService.sections.updateDraftSection,
      { ...data, megaMenuCommandIds },
    );
    return response;
  }
}

function* handleSaveDraftSection({ payload }: ReturnType<typeof saveDraftSection.request>) {
  const { data, type } = payload;

  try {
    const sectionIdCodeVisible: string = yield select(sectionIdCodeVisibleSelector);
    const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

    const response: SagaReturnType<typeof saveSectionRequest> = yield call(saveSectionRequest, data, type);
    const currentIndex = pageSections.findIndex(item => item.id === response.info.id);
    yield put(changeSection(currentIndex, response.info));
    yield put(saveDraftSection.success(undefined));

    notifySaveSection.next({
      title: 'Saving section...',
      description: response.message,
    });

    yield delay(200);
    notifySaveSection.done();

    yield put(setSectionLabel(sectionIdCodeVisible, data.label));
    yield put(setModalDevSectionVisible(false));
    yield put(setModalAdminSectionVisible(false));
  } catch (error) {
    yield put(saveDraftSection.failure(undefined));
    notifySaveSection.done();
    yield delay(300);
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
  }
}

let saveSectionTask: Task | undefined;

export function* watchSaveDraftSection() {
  while (true) {
    const requestAction: ReturnType<typeof saveDraftSection.request> = yield take(getActionType(saveDraftSection.request));
    if (!!saveSectionTask) {
      yield cancel(saveSectionTask);
    }
    saveSectionTask = yield fork(handleSaveDraftSection, requestAction);
  }
}

export function* watchCancelSaveDraftSection() {
  while (true) {
    const cancelAction: ReturnType<typeof saveDraftSection.cancel> = yield take(getActionType(saveDraftSection.cancel));
    if (cancelAction.type === '@BuilderPage/saveDraftSection/cancel' && !!saveSectionTask) {
      yield cancel(saveSectionTask);
    }
  }
}
