import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { DevSection } from 'types/Sections';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { addDraftMegaMenu, setTemplateBoardVisible } from '../../actions';

function* handleAdd({ payload: { commandId, onFulFill } }: ReturnType<typeof addDraftMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.installDraftSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.installDraftSection,
      commandId,
    );
    notifyAxiosHandler.handleSuccess(response.message);
    yield put(setTemplateBoardVisible({ visible: false }));
    yield put(addDraftMegaMenu.success({ commandId }));
    onFulFill?.(response.info as DevSection);
  } catch (error) {
    yield put(addDraftMegaMenu.failure({ commandId }));
  }
}

export function* watchInstallDraftMegaMenu() {
  yield takeLatest(getActionType(addDraftMegaMenu.request), handleAdd);
}
