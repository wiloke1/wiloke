import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { getActionType } from 'wiloke-react-core/utils';
import { installUserMegaMenu } from '../actions';

function* handleInstall({ payload: { commandId, onFulFill } }: ReturnType<typeof installUserMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.installClientMegaMenu>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.installClientMegaMenu,
      commandId,
    );
    yield put(installUserMegaMenu.success({ commandId: response.info.commandId }));

    onFulFill?.(response.info);
  } catch (error) {
    console.log(error);
    yield put(installUserMegaMenu.failure({ commandId }));
  }
}

export function* watchInstallUserMegaMenu() {
  yield takeLatest(getActionType(installUserMegaMenu.request), handleInstall);
}
