import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { approveAddonToAdmin } from '../../actions';

function* handleApproveAddon({ payload: { commandId } }: ReturnType<typeof approveAddonToAdmin.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.approveDraftToAtom>> = yield retry(
      3,
      1000,
      addonService.addons.approveDraftToAtom,
      commandId,
    );
    yield put(approveAddonToAdmin.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(approveAddonToAdmin.failure({ commandId: commandId }));
  }
}

export function* watchApproveAddonsToAdmin() {
  yield takeLatest(getActionType(approveAddonToAdmin.request), handleApproveAddon);
}
