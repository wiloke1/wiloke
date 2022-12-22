import { put, retry, takeLatest } from 'redux-saga/effects';
import { createCategoryOfPageProduct } from 'services/PageService/Logic/createCategoryOfPageProduct';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createCategoryOfPageProduct as actionCreateCategoryOfPageProduct } from '../actions/actionPagesProduct';

function* handleCreate({ payload: { description, name } }: ReturnType<typeof actionCreateCategoryOfPageProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof createCategoryOfPageProduct>> = yield retry(3, 1000, createCategoryOfPageProduct, {
      description,
      name,
    });
    yield put(
      actionCreateCategoryOfPageProduct.success({
        commandId: response.info.commandId,
        quantity: '0',
        slug: response.info.name,
        title: response.info.name,
      }),
    );
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionCreateCategoryOfPageProduct.failure(undefined));
  }
}

export function* watchCreateUserPageCategory() {
  yield takeLatest(getActionType(actionCreateCategoryOfPageProduct.request), handleCreate);
}
