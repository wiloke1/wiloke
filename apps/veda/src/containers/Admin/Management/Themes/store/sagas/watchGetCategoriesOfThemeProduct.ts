import { put, retry, takeLatest } from 'redux-saga/effects';
import { getCategoriesOfThemeProduct } from 'services/ThemeService/Logic/getCategoriesOfThemeProduct';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getCategoriesOfThemeProduct as actionGetCategoriesOfThemeProduct } from '../actions/actionThemesProduct';

function* handleGetCategoriesOfThemeProduct(_: ReturnType<typeof actionGetCategoriesOfThemeProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof getCategoriesOfThemeProduct>> = yield retry(3, 1000, getCategoriesOfThemeProduct);
    yield put(actionGetCategoriesOfThemeProduct.success(response));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetCategoriesOfThemeProduct.failure(undefined));
  }
}

export function* watchGetCategoriesOfThemeProduct() {
  yield takeLatest(getActionType(actionGetCategoriesOfThemeProduct.request), handleGetCategoriesOfThemeProduct);
}
