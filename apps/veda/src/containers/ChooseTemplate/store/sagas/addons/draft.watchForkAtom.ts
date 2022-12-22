import { retry, put, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { forkAddonAdminToDraft } from '../../actions';

function* handleFork({ payload: { commandId } }: ReturnType<typeof forkAddonAdminToDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.forkAtom>> = yield retry(3, 1000, addonService.addons.forkAtom, commandId);
    yield put(forkAddonAdminToDraft.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(forkAddonAdminToDraft.failure({ commandId }));
  }
}

export function* watchForkAddonAdminToDraft() {
  yield takeLatest(getActionType(forkAddonAdminToDraft.request), handleFork);
}
