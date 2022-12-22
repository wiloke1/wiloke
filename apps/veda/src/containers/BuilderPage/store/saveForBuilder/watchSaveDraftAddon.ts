import { AxiosError } from 'axios';
import { Task } from 'redux-saga';
import { call, cancel, fork, put, retry, SagaReturnType, take } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { updateAddonToPages } from 'store/actions/actionPages';
import { setActiveAddon, updateActiveAddons } from 'store/global/themeAddons';
import { DevAddon } from 'types/Addons';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveDraftAddon } from './actions';
import { setModalAdminAddonsVisible, setModalDevAddonsVisible } from './slice';

function* saveAddon(data: DevAddon, type: 'create' | 'update') {
  if (type === 'create') {
    const response: Awaited<ReturnType<typeof addonService.addons.createDraft>> = yield retry(3, 1000, addonService.addons.createDraft, {
      ...data,
      commandId: undefined as any,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof addonService.addons.updateDraft>> = yield retry(3, 1000, addonService.addons.updateDraft, data);
    return response;
  }
}

function* handleSaveAddon({ payload }: ReturnType<typeof saveDraftAddon.request>) {
  const { data, type } = payload;

  try {
    const response: SagaReturnType<typeof saveAddon> = yield call(saveAddon, data, type);
    yield put(updateActiveAddons({ addons: response.info }));
    yield put(setActiveAddon({ addon: response.info }));
    yield put(updateAddonToPages(response.info.body));
    notifyAxiosHandler.handleSuccess(response.message);

    yield put(setModalDevAddonsVisible(false));
    yield put(setModalAdminAddonsVisible(false));
    yield put(saveDraftAddon.success(undefined));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(saveDraftAddon.failure(undefined));
  }
}

let saveAddonTask: Task | undefined;

export function* watchSaveDraftAddon() {
  while (true) {
    const requestAction: ReturnType<typeof saveDraftAddon.request> = yield take(getActionType(saveDraftAddon.request));
    if (!!saveAddonTask) {
      yield cancel(saveAddonTask);
    }
    saveAddonTask = yield fork(handleSaveAddon, requestAction);
  }
}

export function* watchCancelDraftAddon() {
  while (true) {
    const cancelAction: ReturnType<typeof saveDraftAddon.cancel> = yield take(getActionType(saveDraftAddon.cancel));
    if (cancelAction.type === '@BuilderPage/saveDraftAddon/cancel' && !!saveAddonTask) {
      yield cancel(saveAddonTask);
    }
  }
}
