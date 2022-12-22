import { deleteAdminAddons } from 'containers/ChooseTemplate/store/actions';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleDelete({ payload }: ReturnType<typeof deleteAdminAddons.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.deleteAtom>> = yield retry(3, 1000, addonService.addons.deleteAtom, commandId);

    yield put(deleteAdminAddons.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteAdminAddons.failure({ commandId }));
  }
}

export function* watchDeleteAdminAddons() {
  yield takeLatest(getActionType(deleteAdminAddons.request), handleDelete);
}
