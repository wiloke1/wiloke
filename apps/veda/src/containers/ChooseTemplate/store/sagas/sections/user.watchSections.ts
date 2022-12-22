import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { getSections, loadMoreSections } from 'containers/ChooseTemplate/store/actions';
import { sectionService } from 'services/SectionService';

import { sectionsSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGetSections({ payload: { categoryName, limit } }: ReturnType<typeof getSections.request>) {
  try {
    const data: Awaited<ReturnType<typeof sectionService.sections.getProductSections>> = yield retry(
      3,
      1000,
      sectionService.sections.getProductSections,
      categoryName,
      limit,
    );
    const _responseData = data;
    yield put(getSections.success({ data: _responseData, hasNextPage: _responseData.length < limit ? false : true }));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    yield put(getSections.failure({ message }));
  }
}

// get template sections
export function* watchSections() {
  yield takeLatest(getActionType(getSections.request), handleGetSections);
}

function* handleLoadMoreSections({ payload }: ReturnType<typeof loadMoreSections.request>) {
  const { lastCursor } = payload;
  try {
    const { categorySlug }: ReturnType<typeof sectionsSelector.categories> = yield select(sectionsSelector.categories);
    const data: Awaited<ReturnType<typeof sectionService.sections.loadMoreProductSections>> = yield retry(
      3,
      1000,
      sectionService.sections.loadMoreProductSections,
      categorySlug,
      lastCursor,
    );

    const _responseData = data;
    yield put(loadMoreSections.success({ data: _responseData, hasNextPage: _responseData.length > 0 ? true : false }));
  } catch (error) {
    console.log('watchLoadMoreSections', error);
    yield put(loadMoreSections.failure({ message: 'failure' }));
  }
}

export function* watchLoadMoreSections() {
  yield takeLatest(getActionType(loadMoreSections.request), handleLoadMoreSections);
}
