import { retry, put, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { publishAdminAddonsToProduct } from '../../actions';
import { setModalPublishAddons } from '../../reducers/addons/admin.sliceAddons';

function* handlePublishAdminAddon({ payload: { addon } }: ReturnType<typeof publishAdminAddonsToProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.publishAtomToProduct>> = yield retry(
      3,
      1000,
      addonService.addons.publishAtomToProduct,
      addon,
    );
    yield put(publishAdminAddonsToProduct.success(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setModalPublishAddons({ visible: false, addonId: '' }));
  } catch (error) {
    yield put(publishAdminAddonsToProduct.failure(undefined));
  }
}

export function* watchPublishAdminAddonToProduct() {
  yield takeLatest(getActionType(publishAdminAddonsToProduct.request), handlePublishAdminAddon);
}
