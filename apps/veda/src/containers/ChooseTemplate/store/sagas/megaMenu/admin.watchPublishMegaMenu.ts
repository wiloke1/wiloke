import { AxiosError } from 'axios';
import { retry, put, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler, ErrorData } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { publishAdminMegaMenuToProduct, setSettingsAdminMegaMenu } from '../../actions';

function* handlePublishAdminMegaMenu({ payload: { productMegaMenu } }: ReturnType<typeof publishAdminMegaMenuToProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.publishAtomToProduct>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.publishAtomToProduct,
      productMegaMenu,
    );
    yield put(publishAdminMegaMenuToProduct.success(undefined));
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setSettingsAdminMegaMenu({ megaMenuId: '', visible: false }));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(publishAdminMegaMenuToProduct.failure(undefined));
  }
}

export function* watchPublishAdminMegaMenu() {
  yield takeLatest(getActionType(publishAdminMegaMenuToProduct.request), handlePublishAdminMegaMenu);
}
