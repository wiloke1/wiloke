import { retry, put, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { rejectDraftMegaMenu } from '../../actions';

function* handleReject({ payload: { section } }: ReturnType<typeof rejectDraftMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.rejectDraft>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.rejectDraft,
      section,
    );
    yield put(rejectDraftMegaMenu.success({ commandId: response.info.commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(rejectDraftMegaMenu.failure({ commandId: section.commandId }));
  }
}

export function* watchRejectDraftMegaMenu() {
  yield takeLatest(getActionType(rejectDraftMegaMenu.request), handleReject);
}
