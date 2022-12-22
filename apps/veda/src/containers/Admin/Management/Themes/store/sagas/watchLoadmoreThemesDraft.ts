import { put, retry, takeLatest } from 'redux-saga/effects';
import { loadmoreThemesDraft } from 'services/ThemeService/Logic/loadmoreThemesDraft';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMoreThemesDraft as actionLoadmoreThemesDraft } from '../actions/actionThemesDraft';

function* handleLoadmoreThemesDraft({ payload }: ReturnType<typeof actionLoadmoreThemesDraft.request>) {
  try {
    const response: Awaited<ReturnType<typeof loadmoreThemesDraft>> = yield retry(3, 1000, loadmoreThemesDraft, {
      lastCursor: payload.cursor,
    });
    yield put(actionLoadmoreThemesDraft.success({ data: response, hasNextPage: response.length > 0 }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadmoreThemesDraft.failure(undefined));
  }
}

export function* watchLoadmoreThemesDraft() {
  yield takeLatest(getActionType(actionLoadmoreThemesDraft.request), handleLoadmoreThemesDraft);
}
