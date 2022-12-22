import { put, retry, takeLatest, select } from '@redux-saga/core/effects';
import { getAdminSections, loadMoreAdminSections } from 'containers/ChooseTemplate/store/actions';
import { sectionService } from 'services/SectionService';
import { sectionsSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { adminCategorySelector } from '../../reducers/sections/admin.reducerCategory';

function* handleGetAdmin(_: ReturnType<typeof getAdminSections.request>) {
  try {
    const { adminCategorySlug }: ReturnType<typeof adminCategorySelector> = yield select(adminCategorySelector);
    const { searchKey }: ReturnType<typeof sectionsSelector.adminSections> = yield select(sectionsSelector.adminSections);

    const response: Awaited<ReturnType<typeof sectionService.sections.getAtomSections>> = yield retry(
      3,
      1000,
      sectionService.sections.getAtomSections,
      {
        categoryName: adminCategorySlug,
        label: searchKey,
      },
    );
    const _responseData = response;
    const hasNextPage = _responseData.length > 0 ? true : false;

    yield put(getAdminSections.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(getAdminSections.failure(undefined));
  }
}

function* handleLoadMoreAdmin({ payload }: ReturnType<typeof loadMoreAdminSections.request>) {
  const { cursor } = payload;

  try {
    const { adminCategorySlug }: ReturnType<typeof adminCategorySelector> = yield select(adminCategorySelector);
    const { searchKey }: ReturnType<typeof sectionsSelector.adminSections> = yield select(sectionsSelector.adminSections);

    const response: Awaited<ReturnType<typeof sectionService.sections.loadMoreAtomSections>> = yield retry(
      3,
      1000,
      sectionService.sections.loadMoreAtomSections,
      {
        cursor,
        categoryName: adminCategorySlug,
        label: searchKey,
      },
    );
    const _responseData = response;
    const hasNextPage = _responseData.length > 0 ? true : false;
    yield put(loadMoreAdminSections.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(loadMoreAdminSections.failure(undefined));
  }
}

export function* watchGetAdminSections() {
  yield takeLatest(getActionType(getAdminSections.request), handleGetAdmin);
}

export function* watchLoadMoreAdminSections() {
  yield takeLatest(getActionType(loadMoreAdminSections.request), handleLoadMoreAdmin);
}
