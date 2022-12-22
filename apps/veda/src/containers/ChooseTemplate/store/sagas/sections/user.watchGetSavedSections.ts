import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { getSavedSections, loadMoreSavedSections, setSavedSectionCategories } from 'containers/ChooseTemplate/store/actions';
import { sectionService } from 'services/SectionService';
import { sectionsSelector } from 'store/selectors';
import { isEmpty } from 'ramda';
import { ProductSection } from 'types/Sections';

function* handleGetSections({ payload: { categories } }: ReturnType<typeof getSavedSections.request>) {
  try {
    const { categories: categoriesState }: ReturnType<typeof sectionsSelector.categories> = yield select(sectionsSelector.categories);
    const data: SagaReturnType<typeof sectionService.sections.getFavorites> = yield retry(3, 1000, sectionService.sections.getFavorites, {
      categories,
    });
    if (!isEmpty(data) && !isEmpty(categoriesState)) {
      let categories_: any[] = [];
      for (const section of data) {
        categories_.push(section.categories);
      }
      categories_ = [...new Set(categories_.flat().filter(Boolean))];
      if (!isEmpty(categories_)) {
        yield put(
          setSavedSectionCategories([
            { commandId: 'all', slug: 'All', title: 'All', quantity: '' },
            ...categoriesState.filter(item => categories_.includes(item.slug)),
          ]),
        );
      }
    }
    yield put(getSavedSections.success({ data: (data as unknown) as ProductSection[], hasNextPage: data.length > 0 ? true : false }));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    console.log(err.response);
    yield put(getSavedSections.failure({ message }));
  }
}

function* handleLoadMore({ payload: { categories, cursor } }: ReturnType<typeof loadMoreSavedSections.request>) {
  try {
    const response: SagaReturnType<typeof sectionService.sections.loadMoreFavorites> = yield retry(
      3,
      1000,
      sectionService.sections.loadMoreFavorites,
      {
        categories,
        cursor,
      },
    );

    yield put(loadMoreSavedSections.success({ data: (response as unknown) as ProductSection[], hasNextPage: response.length > 0 ? true : false }));
  } catch (error) {
    yield put(loadMoreSavedSections.failure(undefined));
  }
}

export function* watchGetSavedSections() {
  yield takeLatest(getActionType(getSavedSections.request), handleGetSections);
}

export function* watchLoadMoreSavedSections() {
  yield takeLatest(getActionType(loadMoreSavedSections.request), handleLoadMore);
}
