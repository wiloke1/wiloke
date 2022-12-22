import { put, retry, takeLatest } from 'redux-saga/effects';
import { loadmoreThemesAtom } from 'services/ThemeService/Logic/loadmoreThemesAtom';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMoreThemesAtom as actionLoadmoreThemesAtom } from '../actions/actionThemesAtom';

function* handleLoadmoreThemesAtom({ payload }: ReturnType<typeof actionLoadmoreThemesAtom.request>) {
  try {
    const response: Awaited<ReturnType<typeof loadmoreThemesAtom>> = yield retry(3, 1000, loadmoreThemesAtom, {
      lastCursor: payload.cursor,
    });
    yield put(actionLoadmoreThemesAtom.success({ data: response, hasNextPage: response.length > 0 }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadmoreThemesAtom.failure(undefined));
  }
}

export function* watchLoadmoreThemesAtom() {
  yield takeLatest(getActionType(actionLoadmoreThemesAtom.request), handleLoadmoreThemesAtom);
}
