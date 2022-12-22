import { retry, put, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { approveMegaMenuToAdmin } from '../../actions';

function* handleApproveMegaMenuToAdmin({ payload: { commandId } }: ReturnType<typeof approveMegaMenuToAdmin.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.approveDraftToAdmin>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.approveDraftToAdmin,
      commandId,
    );
    yield put(approveMegaMenuToAdmin.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(approveMegaMenuToAdmin.failure({ commandId }));
  }
}

export function* watchApproveMegaMenuToAdmin() {
  yield takeLatest(getActionType(approveMegaMenuToAdmin.request), handleApproveMegaMenuToAdmin);
}
