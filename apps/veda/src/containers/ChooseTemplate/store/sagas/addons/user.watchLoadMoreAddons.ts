import { loadMoreAddonsTemplate } from 'containers/ChooseTemplate/store/actions';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { addonSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGet({ payload }: ReturnType<typeof loadMoreAddonsTemplate.request>) {
  const { cursor } = payload;
  try {
    const { navAddonSlug }: ReturnType<typeof addonSelector.userAddonsCategory> = yield select(addonSelector.userAddonsCategory);

    const response: Awaited<ReturnType<typeof addonService.addons.loadMoreProducts>> = yield retry(
      3,
      1000,
      addonService.addons.loadMoreProducts,
      navAddonSlug,
      cursor,
    );

    yield put(loadMoreAddonsTemplate.success({ data: response, hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(loadMoreAddonsTemplate.failure(undefined));
  }
}

export function* watchLoadMoreAddons() {
  yield takeLatest(getActionType(loadMoreAddonsTemplate.request), handleGet);
}
