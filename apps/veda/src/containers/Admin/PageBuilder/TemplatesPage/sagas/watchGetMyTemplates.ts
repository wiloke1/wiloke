import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { getPageFavorites, loadMorePagesFavorites } from 'services/PageService/Logic/getFavorites';
import { pageBuilderSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { getMyTemplates, loadMoreMyTemplates } from '../reducers/actions';

function* handleGetMyTemplates({ payload: { searchKey } }: ReturnType<typeof getMyTemplates.request>) {
  try {
    const response: SagaReturnType<typeof getPageFavorites> = yield retry(3, 500, getPageFavorites, { name: searchKey });

    yield put(
      getMyTemplates.success({
        data: response.info,
        hasNextPage: response.info.length > 0 ? true : false,
      }),
    );
  } catch (error) {
    console.log('watchGetMyTemplates', error);
    yield put(getMyTemplates.failure({ message: 'error' }));
  }
}

export function* watchGetMyTemplates() {
  yield takeLatest(getActionType(getMyTemplates.request), handleGetMyTemplates);
}

function* handleLoadMoreMyTemplates({ payload: { searchKey } }: ReturnType<typeof loadMoreMyTemplates.request>) {
  try {
    const {
      myTemplates: { data },
    }: ReturnType<typeof pageBuilderSelector.templates> = yield select(pageBuilderSelector.templates);
    const lastCursor = data[data.length - 1].commandId;

    const response: Awaited<ReturnType<typeof loadMorePagesFavorites>> = yield retry(3, 1000, loadMorePagesFavorites, {
      cursor: lastCursor,
      name: searchKey,
    });

    yield put(
      loadMoreMyTemplates.success({
        data: response.info,
        hasNextPage: response.info.length > 0 ? true : false,
      }),
    );
  } catch (error) {
    yield put(loadMoreMyTemplates.failure({ message: 'error' }));
  }
}

export function* watchLoadMoreMyTemplates() {
  yield takeLatest(getActionType(loadMoreMyTemplates.request), handleLoadMoreMyTemplates);
}
