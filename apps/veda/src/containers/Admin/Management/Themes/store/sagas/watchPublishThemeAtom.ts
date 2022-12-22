import { put, retry, takeLatest } from 'redux-saga/effects';
import { publishThemeAtom } from 'services/ThemeService/Logic/publishThemeAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { publishThemeAtom as actionPublishThemeAtom } from '../actions/actionThemesAtom';
import { setModalPublishThemeAtom } from '../reducers/sliceThemesAtom';

function* handlePublishThemeAtom({ payload }: ReturnType<typeof actionPublishThemeAtom.request>) {
  const { themeAtom, categoryOfProduct } = payload;
  try {
    const response: Awaited<ReturnType<typeof publishThemeAtom>> = yield retry(3, 1000, publishThemeAtom, { themeAtom, categoryOfProduct });
    yield put(actionPublishThemeAtom.success(undefined));
    yield put(setModalPublishThemeAtom(undefined));

    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionPublishThemeAtom.failure(undefined));
  }
}

export function* watchPublishThemeAtom() {
  yield takeLatest(getActionType(actionPublishThemeAtom.request), handlePublishThemeAtom);
}
