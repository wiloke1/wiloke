import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { changeMySectionCategory, createProductCategory, getTemplateCategories } from 'containers/ChooseTemplate/store/actions';
import { CategoryState, setUserCategorySection } from 'containers/ChooseTemplate/store/reducers/sections/user.reducerCategory';
import { sectionService } from 'services/SectionService';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { sectionsSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleCategories(_: ReturnType<typeof getTemplateCategories.request>) {
  try {
    const { getStatus, categories }: CategoryState = yield select(sectionsSelector.categories);

    if (getStatus === 'success') {
      yield put(getTemplateCategories.success({ data: categories }));
    } else {
      const data: Awaited<ReturnType<typeof sectionService.categories.getCategoriesOfProduct>> = yield retry(
        3,
        1000,
        sectionService.categories.getCategoriesOfProduct,
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
      yield put(getTemplateCategories.success({ data: _dataSuccess }));
      const checkExist = Array.isArray(_dataSuccess) && _dataSuccess.length > 0;
      let firstItem: SectionCategoryForFrontend = {
        commandId: '',
        title: '',
        slug: '',
        quantity: '',
      };

      if (checkExist) {
        if (_dataSuccess[0].slug === 'mega-menu') {
          firstItem = _dataSuccess[1];
        } else {
          firstItem = _dataSuccess[0];
        }
      }

      yield put(
        setUserCategorySection({
          categoryId: firstItem.commandId,
          categorySlug: firstItem.slug,
          sectionQuantityOfCategory: Number(firstItem.quantity ?? 0),
        }),
      );
      yield put(changeMySectionCategory({ categorySlug: 'All' }));
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    yield put(getTemplateCategories.failure({ message }));
  }
}

export function* watchCategories() {
  yield takeLatest(getActionType(getTemplateCategories.request), handleCategories);
}

function* handleCreateCategory({ payload: { description, name } }: ReturnType<typeof createProductCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.categories.createCategoryOfProduct>> = yield retry(
      3,
      1000,
      sectionService.categories.createCategoryOfProduct,
      {
        description,
        name,
      },
    );
    yield put(
      createProductCategory.success({
        quantity: '0',
        commandId: response.info.commandId,
        slug: response.info.name,
        title: response.info.description,
      }),
    );
  } catch (error) {
    yield put(createProductCategory.failure(undefined));
  }
}

export function* watchCreateProductCategory() {
  yield takeLatest(getActionType(createProductCategory.request), handleCreateCategory);
}
