import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { addDraftCategory, getDraftCategories } from 'containers/ChooseTemplate/store/actions';
import { draftCategorySelector } from 'containers/ChooseTemplate/store/reducers/sections/draft.reducerCategory';
import { sectionService } from 'services/SectionService';

import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleCategories(_: ReturnType<typeof getDraftCategories.request>) {
  try {
    const { getStatus, categories }: ReturnType<typeof draftCategorySelector> = yield select(draftCategorySelector);

    if (getStatus === 'success') {
      yield put(getDraftCategories.success({ data: categories }));
    } else {
      const data: Awaited<ReturnType<typeof sectionService.categories.getCategoriesOfDraft>> = yield retry(
        3,
        1000,
        sectionService.categories.getCategoriesOfDraft,
      );
      const _dataSuccess = (data ?? []).sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      yield put(getDraftCategories.success({ data: _dataSuccess }));
    }
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    yield put(getDraftCategories.failure({ message }));
  }
}

function* handleCreateCategory({ payload: { description, name } }: ReturnType<typeof addDraftCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.categories.createCategoryOfDraft>> = yield retry(
      3,
      1000,
      sectionService.categories.createCategoryOfDraft,
      { description, name },
    );
    yield put(
      addDraftCategory.success({
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
    yield put(addDraftCategory.failure({ message }));
  }
}

export function* watchCreateDraftCategory() {
  yield takeLatest(getActionType(addDraftCategory.request), handleCreateCategory);
}

export function* watchGetDraftCategories() {
  yield takeLatest(getActionType(getDraftCategories.request), handleCategories);
}
