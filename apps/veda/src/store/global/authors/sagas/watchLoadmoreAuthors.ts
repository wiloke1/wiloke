import { put, retry, takeLatest } from 'redux-saga/effects';
import { getAuthors } from 'services/UserService/Logic/getAuthors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreAuthors as actionLoadmoreAuthors } from '../action';

function* handleLoadmoreAuthors({ payload }: ReturnType<typeof actionLoadmoreAuthors.request>) {
  try {
    const { page, role } = payload;
    const { content, pageable }: Awaited<ReturnType<typeof getAuthors>> = yield retry(3, 1000, getAuthors, {
      page,
      role,
    });
    yield put(actionLoadmoreAuthors.success({ authors: content, page: pageable.number, totalPages: pageable.totalPages }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadmoreAuthors.failure(undefined));
  }
}

export function* watchLoadmoreAuthors() {
  yield takeLatest(getActionType(actionLoadmoreAuthors.request), handleLoadmoreAuthors);
}
