import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { addonSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { getAdminAddons, loadMoreAdminAddons } from '../../actions';

function* handleGetAddons({ payload: { categoryName } }: ReturnType<typeof getAdminAddons.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.getAtoms>> = yield retry(3, 1000, addonService.addons.getAtoms, categoryName);
    yield put(getAdminAddons.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(getAdminAddons.failure(undefined));
  }
}

export function* watchGetAdminAddons() {
  yield takeLatest(getActionType(getAdminAddons.request), handleGetAddons);
}

function* handleLoadMoreAdminAddons({ payload: { cursor } }: ReturnType<typeof loadMoreAdminAddons.request>) {
  try {
    const { categorySlug }: ReturnType<typeof addonSelector.adminAddonsCategory> = yield select(addonSelector.adminAddonsCategory);
    const response: Awaited<ReturnType<typeof addonService.addons.loadMoreAtoms>> = yield retry(
      3,
      1000,
      addonService.addons.loadMoreAtoms,
      categorySlug,
      cursor,
    );
    yield put(loadMoreAdminAddons.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(loadMoreAdminAddons.failure(undefined));
  }
}

export function* watchLoadMoreAdminAddons() {
  yield takeLatest(getActionType(loadMoreAdminAddons.request), handleLoadMoreAdminAddons);
}
