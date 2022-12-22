import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { getActionType } from 'wiloke-react-core/utils';
import { addAdminMegaMenu, setTemplateBoardVisible } from '../../actions';

function* handleAdd({ payload: { commandId, onFulFill } }: ReturnType<typeof addAdminMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.installAtomSection>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.installAtomSection,
      commandId,
    );
    yield put(setTemplateBoardVisible({ visible: false }));
    yield put(addAdminMegaMenu.success({ commandId }));
    onFulFill?.(response.info);
  } catch (error) {
    console.log(error);
    yield put(addAdminMegaMenu.failure({ commandId }));
  }
}

export function* watchInstallAdminMegaMenu() {
  yield takeLatest(getActionType(addAdminMegaMenu.request), handleAdd);
}
