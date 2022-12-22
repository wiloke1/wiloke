import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { addAdminCategory, getAdminCategories } from 'containers/ChooseTemplate/store/actions';
import { adminCategorySelector } from 'containers/ChooseTemplate/store/reducers/sections/admin.reducerCategory';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleCategories(_: ReturnType<typeof getAdminCategories.request>) {
  try {
    const { getStatus, categories }: ReturnType<typeof adminCategorySelector> = yield select(adminCategorySelector);

    if (getStatus === 'success') {
      yield put(getAdminCategories.success({ data: categories }));
    } else {
      const data: Awaited<ReturnType<typeof sectionService.categories.getCategoriesOfAtom>> = yield retry(
        3,
        1000,
        sectionService.categories.getCategoriesOfAtom,
      );
      const _dataResponse = (data ?? []).sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      yield put(getAdminCategories.success({ data: _dataResponse }));
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    yield put(getAdminCategories.failure({ message }));
  }
}

function* handleCreateCategory({ payload }: ReturnType<typeof addAdminCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.categories.createCategoryOfAtom>> = yield retry(
      3,
      1000,
      sectionService.categories.createCategoryOfAtom,
      { description: payload.description, name: payload.name },
    );
    yield put(
      addAdminCategory.success({
        quantity: '0',
        commandId: response.info.commandId,
        slug: response.info.name,
        title: response.info.description,
      }),
    );
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    yield put(addAdminCategory.failure({ message }));
  }
}

export function* watchCreateAdminCategory() {
  yield takeLatest(getActionType(addAdminCategory.request), handleCreateCategory);
}

export function* watchGetAdminCategories() {
  yield takeLatest(getActionType(getAdminCategories.request), handleCategories);
}
