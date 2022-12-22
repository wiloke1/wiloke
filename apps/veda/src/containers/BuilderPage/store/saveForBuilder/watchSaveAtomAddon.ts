import { AxiosError } from 'axios';
import { Task } from 'redux-saga';
import { call, cancel, fork, put, retry, SagaReturnType, take } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { updateAddonToPages } from 'store/actions/actionPages';
import { setActiveAddon, updateActiveAddons } from 'store/global/themeAddons';
import { AdminAddon } from 'types/Addons';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { saveAtomAddon } from './actions';
import { setModalAdminAddonsVisible, setModalDevAddonsVisible } from './slice';

function* saveAddon(data: AdminAddon, type: 'create' | 'update') {
  if (type === 'create') {
    const response: Awaited<ReturnType<typeof addonService.addons.createAtomAddon>> = yield retry(3, 1000, addonService.addons.createAtomAddon, {
      ...data,
      commandId: undefined,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof addonService.addons.updateAtom>> = yield retry(3, 1000, addonService.addons.updateAtom, data);
    return response;
  }
}

function* handleSaveAddon({ payload }: ReturnType<typeof saveAtomAddon.request>) {
  const { data, type } = payload;

  try {
    const response: SagaReturnType<typeof saveAddon> = yield call(saveAddon, data, type);
    yield put(updateActiveAddons({ addons: response.info }));
    yield put(setActiveAddon({ addon: response.info }));
    yield put(updateAddonToPages(response.info.body));

    notifyAxiosHandler.handleSuccess(response.message);
    yield put(saveAtomAddon.success(undefined));

    yield put(setModalDevAddonsVisible(false));
    yield put(setModalAdminAddonsVisible(false));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(saveAtomAddon.failure(undefined));
  }
}

let saveAddonTask: Task | undefined;

export function* watchSaveAtomAddon() {
  while (true) {
    const requestAction: ReturnType<typeof saveAtomAddon.request> = yield take(getActionType(saveAtomAddon.request));
    if (!!saveAddonTask) {
      yield cancel(saveAddonTask);
    }
    saveAddonTask = yield fork(handleSaveAddon, requestAction);
  }
}

export function* watchCancelAtomAddon() {
  while (true) {
    const cancelAction: ReturnType<typeof saveAtomAddon.cancel> = yield take(getActionType(saveAtomAddon.cancel));
    if (cancelAction.type === '@BuilderPage/saveAtomAddon/cancel' && !!saveAddonTask) {
      yield cancel(saveAddonTask);
    }
  }
}
