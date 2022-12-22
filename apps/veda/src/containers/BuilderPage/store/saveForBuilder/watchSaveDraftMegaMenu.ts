import { AxiosError } from 'axios';
import { Task } from 'redux-saga';
import { call, cancel, fork, put, retry, SagaReturnType, select, take } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { changeSection, setSectionLabel } from 'store/actions/actionPages';
import { pageSectionsSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { DevSection, PageSection } from 'types/Sections';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveDraftMegaMenu } from './actions';
import { setModalDevMegaMenuVisible } from './slice';

function* saveMegaMenu(data: DevSection, type: 'create' | 'update') {
  if (type === 'create') {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.createDraftSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.createDraftSection,
      {
        ...data,
        commandId: undefined,
      },
    );
    return response;
  } else {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.updateDraftSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.updateDraftSection,
      data,
    );
    return response;
  }
}

function* handleSave({ payload }: ReturnType<typeof saveDraftMegaMenu.request>) {
  const { data, type } = payload;

  try {
    const sectionIdCodeVisible: string = yield select(sectionIdCodeVisibleSelector);
    const pageSections: PageSection[] = yield select(pageSectionsSelector);

    const response: SagaReturnType<typeof saveMegaMenu> = yield call(saveMegaMenu, data, type);
    const currentIndex = pageSections.findIndex(item => item.id === response.info.id);
    yield put(changeSection(currentIndex, response.info));
    yield put(saveDraftMegaMenu.success(undefined));
    yield put(setSectionLabel(sectionIdCodeVisible, data.label));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setModalDevMegaMenuVisible(false));
  } catch (error) {
    console.log('watchSaveAtomMegaMenu', error);
    yield put(saveDraftMegaMenu.failure(undefined));
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
  }
}

let saveMenuTask: Task | undefined;

export function* watchSaveDraftMegaMenu() {
  while (true) {
    const requestAction: ReturnType<typeof saveDraftMegaMenu.request> = yield take(getActionType(saveDraftMegaMenu.request));
    if (!!saveMenuTask) {
      yield cancel(saveMenuTask);
    }
    saveMenuTask = yield fork(handleSave, requestAction);
  }
}

export function* watchCancelDraftMegaMenu() {
  while (true) {
    const cancelAction: ReturnType<typeof saveDraftMegaMenu.cancel> = yield take(getActionType(saveDraftMegaMenu.cancel));
    if (cancelAction.type === '@BuilderPage/saveDraftMegaMenu/cancel' && !!saveMenuTask) {
      yield cancel(saveMenuTask);
    }
  }
}
