import { AxiosError } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteProductAddons } from '../../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteProductAddons.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.deleteProduct>> = yield retry(
      3,
      1000,
      addonService.addons.deleteProduct,
      commandId,
    );
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(deleteProductAddons.success({ commandId }));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(deleteProductAddons.failure({ commandId }));
  }
}

export function* watchDeleteProductAddon() {
  yield takeLatest(getActionType(deleteProductAddons.request), handleDelete);
}
