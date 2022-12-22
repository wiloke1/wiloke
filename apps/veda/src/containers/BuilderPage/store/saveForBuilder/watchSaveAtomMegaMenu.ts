import { AxiosError } from 'axios';
import { Task } from 'redux-saga';
import { call, cancel, fork, put, retry, SagaReturnType, select, take } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { changeSection, setSectionLabel } from 'store/actions/actionPages';
import { pageSectionsSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { AdminSection, PageSection } from 'types/Sections';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveAtomMegaMenu } from './actions';
import { setModalAdminMegaMenuVisible } from './slice';

function* saveMegaMenu(data: AdminSection, type: 'create' | 'update') {
  if (type === 'create') {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.createAtomSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.createAtomSection,
      { ...data, commandId: undefined },
    );
    return response;
  } else {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.updateAtomSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.updateAtomSection,
      data,
    );
    return response;
  }
}

function* handleSave({ payload }: ReturnType<typeof saveAtomMegaMenu.request>) {
  const { data, type } = payload;

  try {
    const sectionIdCodeVisible: string = yield select(sectionIdCodeVisibleSelector);
    const pageSections: PageSection[] = yield select(pageSectionsSelector);

    const response: SagaReturnType<typeof saveMegaMenu> = yield call(saveMegaMenu, data, type);
    const currentIndex = pageSections.findIndex(item => item.id === response.info.id);
    yield put(changeSection(currentIndex, response.info));
    yield put(saveAtomMegaMenu.success(undefined));
    yield put(setSectionLabel(sectionIdCodeVisible, response.info.label));

    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setModalAdminMegaMenuVisible(false));
  } catch (error) {
    console.log('watchSaveAtomMegaMenu', error);
    yield put(saveAtomMegaMenu.failure(undefined));
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
  }
}

let saveMenuTask: Task | undefined;

export function* watchSaveAtomMegaMenu() {
  while (true) {
    const requestAction: ReturnType<typeof saveAtomMegaMenu.request> = yield take(getActionType(saveAtomMegaMenu.request));
    if (!!saveMenuTask) {
      yield cancel(saveMenuTask);
    }
    saveMenuTask = yield fork(handleSave, requestAction);
  }
}

export function* watchCancelAtomMegaMenu() {
  while (true) {
    const cancelAction: ReturnType<typeof saveAtomMegaMenu.cancel> = yield take(getActionType(saveAtomMegaMenu.cancel));
    if (cancelAction.type === '@BuilderPage/saveAtomMegaMenu/cancel' && !!saveMenuTask) {
      yield cancel(saveMenuTask);
    }
  }
}
