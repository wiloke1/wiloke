import { retry, put, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectDraftAddon } from '../../actions';

function* handleReject({ payload: { devAddon } }: ReturnType<typeof rejectDraftAddon.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.rejectDraft>> = yield retry(3, 1000, addonService.addons.rejectDraft, devAddon);
    yield put(rejectDraftAddon.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(rejectDraftAddon.failure({ commandId: devAddon.commandId ?? '' }));
  }
}

export function* watchRejectDraftAddon() {
  yield takeLatest(getActionType(rejectDraftAddon.request), handleReject);
}
