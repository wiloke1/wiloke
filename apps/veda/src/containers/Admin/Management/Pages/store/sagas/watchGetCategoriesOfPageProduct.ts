import { put, retry, takeLatest } from 'redux-saga/effects';
import { getCategoriesOfPageProduct } from 'services/PageService/Logic/getCategoriesOfPageProduct';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getCategoriesOfPageProduct as actionGetCategoriesOfPageProduct } from '../actions/actionPagesProduct';

function* handleGetCategoriesOfPageProduct(_: ReturnType<typeof actionGetCategoriesOfPageProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof getCategoriesOfPageProduct>> = yield retry(3, 1000, getCategoriesOfPageProduct);
    yield put(actionGetCategoriesOfPageProduct.success(response));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetCategoriesOfPageProduct.failure(undefined));
  }
}

export function* watchGetCategoriesOfPageProduct() {
  yield takeLatest(getActionType(actionGetCategoriesOfPageProduct.request), handleGetCategoriesOfPageProduct);
}
