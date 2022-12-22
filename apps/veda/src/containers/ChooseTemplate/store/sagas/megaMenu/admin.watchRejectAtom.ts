import { retry, put, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectAdminMegaMenu } from '../../actions';

function* handleReject({ payload: { commandId, assignTo, comment } }: ReturnType<typeof rejectAdminMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.rejectAtom>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.rejectAtom,
      commandId,
      assignTo,
      comment,
    );
    yield put(rejectAdminMegaMenu.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(rejectAdminMegaMenu.failure({ commandId }));
  }
}

export function* watchRejectAtomMegaMenu() {
  yield takeLatest(getActionType(rejectAdminMegaMenu.request), handleReject);
}
