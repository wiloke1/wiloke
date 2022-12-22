import { put, retry, takeLatest } from 'redux-saga/effects';
import { getAuthors } from 'services/UserService/Logic/getAuthors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getAuthors as actionGetAuthors } from '../action';

function* handleGetAuthors({ payload }: ReturnType<typeof actionGetAuthors.request>) {
  try {
    const { role } = payload;
    const { content, pageable }: Awaited<ReturnType<typeof getAuthors>> = yield retry(3, 1000, getAuthors, {
      page: 0,
      role,
    });
    yield put(actionGetAuthors.success({ authors: content, page: pageable.number, totalPages: pageable.totalPages }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetAuthors.failure(undefined));
  }
}

export function* watchGetAuthors() {
  yield takeLatest(getActionType(actionGetAuthors.request), handleGetAuthors);
}
