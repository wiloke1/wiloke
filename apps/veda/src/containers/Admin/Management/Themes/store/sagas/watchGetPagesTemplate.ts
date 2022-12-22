import { put, retry, takeEvery } from 'redux-saga/effects';
import { getPagesAtomWithPageType } from 'services/PageService/Logic/getPagesAtomWithPageType';
import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getPagesTemplate as actionGetPagesTemplate } from '../actions/actionPagesTemplate';

function* handleGetPagesTemplate({ payload }: ReturnType<typeof actionGetPagesTemplate.request>) {
  const { pageType } = payload;
  try {
    const response: Awaited<ReturnType<typeof getPagesAtomWithPageType>> = yield retry(3, 1000, getPagesAtomWithPageType, { pageType });

    // TODO: Utils transform thay vì ép kiểu
    yield put(
      actionGetPagesTemplate.success({
        data: response.info as AdminPageDatabase[],
        hasNextPage: response.info.length > 0,
        pageType,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetPagesTemplate.failure({ pageType }));
  }
}

export function* watchGetPagesTemplate() {
  yield takeEvery(getActionType(actionGetPagesTemplate.request), handleGetPagesTemplate);
}
