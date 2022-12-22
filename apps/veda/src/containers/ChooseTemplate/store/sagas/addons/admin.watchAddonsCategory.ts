import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createAdminAddonsCategory, getAdminAddonsCategory } from '../../actions';

function* handleGet(_: ReturnType<typeof getAdminAddonsCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.categories.getCategoriesOfAtom>> = yield retry(
      3,
      1000,
      addonService.categories.getCategoriesOfAtom,
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

    yield put(getAdminAddonsCategory.success({ data: _dataResponse }));
  } catch {
    yield put(getAdminAddonsCategory.failure(undefined));
  }
}

export function* watchGetAdminAddonCategory() {
  yield takeLatest(getActionType(getAdminAddonsCategory.request), handleGet);
}

function* createAdminCate({ payload: { description, name } }: ReturnType<typeof createAdminAddonsCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.categories.createCategoryOfAtom>> = yield retry(
      3,
      1000,
      addonService.categories.createCategoryOfAtom,
      {
        description,
        name,
      },
    );
    yield put(
      createAdminAddonsCategory.success({
        commandId: response.info.commandId,
        slug: response.info.name,
        title: response.info.description,
        quantity: '',
      }),
    );
    notifyAxiosHandler.handleSuccess(response.message);
  } catch {
    yield put(createAdminAddonsCategory.failure(undefined));
  }
}

export function* watchCreateAdminAddonCategory() {
  yield takeLatest(getActionType(createAdminAddonsCategory.request), createAdminCate);
}
