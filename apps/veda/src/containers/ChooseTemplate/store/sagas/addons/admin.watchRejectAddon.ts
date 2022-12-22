import { retry, put, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectAdminAddon } from '../../actions';
import { setCurrentAdminAddon } from '../../reducers/addons/admin.sliceAddons';

function* handleReject({ payload: { commandId, assignTo, comment } }: ReturnType<typeof rejectAdminAddon.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.rejectAtom>> = yield retry(
      3,
      1000,
      addonService.addons.rejectAtom,
      commandId,
      assignTo,
      comment,
    );
    yield put(rejectAdminAddon.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setCurrentAdminAddon(undefined));
  } catch (error) {
    yield put(rejectAdminAddon.failure({ commandId }));
  }
}

export function* watchRejectAdminAddon() {
  yield takeLatest(getActionType(rejectAdminAddon.request), handleReject);
}
