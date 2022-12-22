import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createDraftAddonsCategory, getDraftAddonsCategory } from '../../actions';

function* handleGetCategories(_: ReturnType<typeof getDraftAddonsCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.categories.getCategoriesOfDraft>> = yield retry(
      3,
      1000,
      addonService.categories.getCategoriesOfDraft,
    );
    const _dataResponse = response.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    yield put(getDraftAddonsCategory.success({ data: _dataResponse }));
  } catch {
    yield put(getDraftAddonsCategory.failure(undefined));
  }
}

export function* watchGetDraftAddonCategory() {
  yield takeLatest(getActionType(getDraftAddonsCategory.request), handleGetCategories);
}

function* createDraftCate({ payload: { description, name } }: ReturnType<typeof createDraftAddonsCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.categories.createCategoryOfDraft>> = yield retry(
      3,
      1000,
      addonService.categories.createCategoryOfDraft,
      { description, name },
    );
    yield put(
      createDraftAddonsCategory.success({
        commandId: response.info.commandId,
        slug: response.info.name,
        title: response.info.description,
        quantity: '',
      }),
    );
    notifyAxiosHandler.handleSuccess(response.message);
  } catch {
    yield put(createDraftAddonsCategory.failure(undefined));
  }
}

export function* watchCreateDraftAddonCategory() {
  yield takeLatest(getActionType(createDraftAddonsCategory.request), createDraftCate);
}
