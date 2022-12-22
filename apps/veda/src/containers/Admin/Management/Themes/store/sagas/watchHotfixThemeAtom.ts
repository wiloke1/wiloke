import { put, retry, takeEvery } from 'redux-saga/effects';
import { hotfixThemeAtom } from 'services/ThemeService/Logic/hotfixThemeAtom';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { hotfixThemeAtom as actionHotfixThemeAtom } from '../actions/actionThemesAtom';
import { setModalHotfixThemeAtom } from '../reducers/sliceThemesAtom';

function* handleHotfixThemeAtom({ payload }: ReturnType<typeof actionHotfixThemeAtom.request>) {
  const { commandId, assignToUserId, message } = payload;
  try {
    yield retry(3, 1000, hotfixThemeAtom, {
      commandId,
      assignTo: assignToUserId,
      comment: message,
    });
    yield put(actionHotfixThemeAtom.success({ commandId }));
    yield put(setModalHotfixThemeAtom(undefined));
    notifyAxiosHandler.handleSuccess(i18n.t('general.success'));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionHotfixThemeAtom.failure({ commandId }));
  }
}

export function* watchHotfixThemeAtom() {
  yield takeEvery(getActionType(actionHotfixThemeAtom.request), handleHotfixThemeAtom);
}
