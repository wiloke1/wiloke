import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAdminMegaMenu } from '../../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteAdminMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.deleteAtomSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.deleteAtomSection,
      commandId,
    );
    yield put(deleteAdminMegaMenu.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteAdminMegaMenu.failure({ commandId }));
  }
}

export function* watchDeleteAdminMegaMenu() {
  yield takeLatest(getActionType(deleteAdminMegaMenu.request), handleDelete);
}
