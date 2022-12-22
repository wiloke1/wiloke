import { deleteDraftAddons } from 'containers/ChooseTemplate/store/actions';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleDelete({ payload }: ReturnType<typeof deleteDraftAddons.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.deleteDraft>> = yield retry(3, 1000, addonService.addons.deleteDraft, commandId);
    yield put(deleteDraftAddons.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteDraftAddons.failure({ commandId }));
  }
}

export function* watchDeleteDraftAddons() {
  yield takeLatest(getActionType(deleteDraftAddons.request), handleDelete);
}
