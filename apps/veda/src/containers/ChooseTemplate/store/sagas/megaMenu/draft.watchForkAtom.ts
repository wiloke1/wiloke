import { retry, put, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { forkMegaMenuAdminToDraft } from '../../actions';

function* handleFork({ payload: { commandId } }: ReturnType<typeof forkMegaMenuAdminToDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.forkAtom>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.forkAtom,
      commandId,
    );
    yield put(forkMegaMenuAdminToDraft.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(forkMegaMenuAdminToDraft.failure({ commandId }));
  }
}

export function* watchForkAdminMegaMenuToDraft() {
  yield takeLatest(getActionType(forkMegaMenuAdminToDraft.request), handleFork);
}
