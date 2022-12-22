import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { loadMoreClientThemesAPI } from 'services/ThemeService/Logic/loadMoreClientThemes';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMoreClientThemes } from '../slice/actions';
import { themeDashboardSelector } from '../slice/sliceThemeDashboard';

function* handleLoadMore() {
  try {
    const { themes }: ReturnType<typeof themeDashboardSelector> = yield select(themeDashboardSelector);
    const lastCursor = themes[themes.length - 1].commandId;
    const response: Awaited<ReturnType<typeof loadMoreClientThemesAPI>> = yield retry(3, 1000, loadMoreClientThemesAPI, { lastCursor });
    yield put(loadMoreClientThemes.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    console.log('error', error);
    yield put(loadMoreClientThemes.failure(undefined));
  }
}

export function* watchLoadMoreClientThemes() {
  yield takeLatest(getActionType(loadMoreClientThemes.request), handleLoadMore);
}
