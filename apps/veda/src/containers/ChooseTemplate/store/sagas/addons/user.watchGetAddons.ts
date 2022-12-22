import { getAddonsTemplate } from 'containers/ChooseTemplate/store/actions';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGet({ payload }: ReturnType<typeof getAddonsTemplate.request>) {
  const { categoryName, limit } = payload;
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.getProducts>> = yield retry(
      3,
      1000,
      addonService.addons.getProducts,
      categoryName,
      limit,
    );

    yield put(getAddonsTemplate.success({ data: response, hasNextPage: response.length < limit ? false : true }));
  } catch (error) {
    console.log('error', error);
    yield put(getAddonsTemplate.failure(undefined));
  }
}

export function* watchGetAddonsTemplate() {
  yield takeLatest(getActionType(getAddonsTemplate.request), handleGet);
}
