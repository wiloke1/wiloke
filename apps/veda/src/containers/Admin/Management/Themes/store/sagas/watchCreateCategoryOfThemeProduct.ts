import { put, retry, takeLatest } from 'redux-saga/effects';
import { createCategoryOfThemeProduct } from 'services/ThemeService/Logic/createCategoryOfThemeProduct';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createCategoryOfThemeProduct as actionCreateCategoryOfThemeProduct } from '../actions/actionThemesProduct';

function* handleCreate({ payload: { description, name } }: ReturnType<typeof actionCreateCategoryOfThemeProduct.request>) {
  try {
    const response: Awaited<ReturnType<typeof createCategoryOfThemeProduct>> = yield retry(3, 1000, createCategoryOfThemeProduct, {
      description,
      name,
    });
    yield put(
      actionCreateCategoryOfThemeProduct.success({
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
    yield put(actionCreateCategoryOfThemeProduct.failure(undefined));
  }
}

export function* watchCreateUserThemeCategory() {
  yield takeLatest(getActionType(actionCreateCategoryOfThemeProduct.request), handleCreate);
}
