import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteDraftMegaMenu } from '../../actions';

function* handleDelete({ payload: { commandId } }: ReturnType<typeof deleteDraftMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.deleteDraftSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.deleteDraftSection,
      commandId,
    );
    yield put(deleteDraftMegaMenu.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteDraftMegaMenu.failure({ commandId }));
  }
}

export function* watchDeleteDraftMegaMenu() {
  yield takeLatest(getActionType(deleteDraftMegaMenu.request), handleDelete);
}
