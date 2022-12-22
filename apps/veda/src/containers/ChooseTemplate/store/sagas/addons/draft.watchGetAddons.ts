import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { addonSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { getDraftAddons, loadMoreDraftAddons } from '../../actions';

function* handleGetAddons({ payload: { categoryName } }: ReturnType<typeof getDraftAddons.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.getDrafts>> = yield retry(3, 1000, addonService.addons.getDrafts, categoryName);
    yield put(getDraftAddons.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(getDraftAddons.failure(undefined));
  }
}

export function* watchGetDraftAddons() {
  yield takeLatest(getActionType(getDraftAddons.request), handleGetAddons);
}

function* handleLoadMoreDraftAddons({ payload: { cursor } }: ReturnType<typeof loadMoreDraftAddons.request>) {
  try {
    const { categorySlug }: ReturnType<typeof addonSelector.draftAddonsCategory> = yield select(addonSelector.draftAddonsCategory);
    const response: Awaited<ReturnType<typeof addonService.addons.loadMoreDrafts>> = yield retry(
      3,
      1000,
      addonService.addons.loadMoreDrafts,
      categorySlug,
      cursor,
    );
    yield put(loadMoreDraftAddons.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(loadMoreDraftAddons.failure(undefined));
  }
}

export function* watchLoadMoreDraftAddons() {
  yield takeLatest(getActionType(loadMoreDraftAddons.request), handleLoadMoreDraftAddons);
}
