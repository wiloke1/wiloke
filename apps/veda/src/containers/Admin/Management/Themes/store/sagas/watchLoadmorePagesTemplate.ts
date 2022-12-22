import { put, retry, takeEvery } from 'redux-saga/effects';
import { loadmorePagesAtomWithPageType } from 'services/PageService/Logic/loadmorePagesAtomWithPageType';
import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMorePagesTemplate as actionLoadmorePagesTemplate } from '../actions/actionPagesTemplate';

function* handleLoadmorePagesTemplate({ payload }: ReturnType<typeof actionLoadmorePagesTemplate.request>) {
  const { pageType, cursor } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadmorePagesAtomWithPageType>> = yield retry(3, 1000, loadmorePagesAtomWithPageType, {
      pageType,
      cursor,
    });

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionLoadmorePagesTemplate.success({
        data: response.info as AdminPageDatabase[],
        hasNextPage: response.info.length > 0,
        pageType,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionLoadmorePagesTemplate.failure({ pageType }));
  }
}

export function* watchLoadmorePagesTemplate() {
  yield takeEvery(getActionType(actionLoadmorePagesTemplate.request), handleLoadmorePagesTemplate);
}
