import { put, retry, takeEvery } from 'redux-saga/effects';
import { forkThemeAtom } from 'services/ThemeService/Logic/forkThemeAtom';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { forkThemeAtom as actionForkThemeAtom } from '../actions/actionThemesDraft';

function* handleForkThemeAtom({ payload }: ReturnType<typeof actionForkThemeAtom.request>) {
  const { commandId, callback } = payload;
  try {
    const response: Awaited<ReturnType<typeof forkThemeAtom>> = yield retry(3, 1000, forkThemeAtom, { commandId });
    yield put(actionForkThemeAtom.success({ commandId }));
    callback(response.commandId);
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.fork', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionForkThemeAtom.failure(payload));
  }
}

export function* watchForkThemeAtom() {
  yield takeEvery(getActionType(actionForkThemeAtom.request), handleForkThemeAtom);
}
