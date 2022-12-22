import { retry, put, takeLatest } from '@redux-saga/core/effects';
import { getDraftSections, loadMoreDraftSections } from 'containers/ChooseTemplate/store/actions';
import { select } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { sectionsSelector } from 'store/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { draftCategorySelector } from '../../reducers/sections/draft.reducerCategory';

function* handleGetDraft(_: ReturnType<typeof getDraftSections.request>) {
  try {
    const { draftCategorySlug }: ReturnType<typeof draftCategorySelector> = yield select(draftCategorySelector);
    const { searchKey }: ReturnType<typeof sectionsSelector.draftSections> = yield select(sectionsSelector.draftSections);

    const response: Awaited<ReturnType<typeof sectionService.sections.getDraftSections>> = yield retry(
      3,
      1000,
      sectionService.sections.getDraftSections,
      {
        categoryName: draftCategorySlug,
        label: searchKey,
      },
    );
    const _responseData = response;
    const hasNextPage = _responseData.length > 0 ? true : false;

    yield put(getDraftSections.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(getDraftSections.failure(undefined));
  }
}
export function* watchGetDraftSections() {
  yield takeLatest(getActionType(getDraftSections.request), handleGetDraft);
}

function* handleLoadMoreDraft({ payload }: ReturnType<typeof loadMoreDraftSections.request>) {
  const { cursor } = payload;
  try {
    const { draftCategorySlug }: ReturnType<typeof draftCategorySelector> = yield select(draftCategorySelector);
    const { searchKey }: ReturnType<typeof sectionsSelector.draftSections> = yield select(sectionsSelector.draftSections);

    const response: Awaited<ReturnType<typeof sectionService.sections.loadMoreDraftSections>> = yield retry(
      3,
      1000,
      sectionService.sections.loadMoreDraftSections,
      {
        cursor,
        categoryName: draftCategorySlug,
        label: searchKey,
      },
    );

    const _responseData = response;
    const hasNextPage = _responseData.length > 0 ? true : false;
    yield put(loadMoreDraftSections.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(loadMoreDraftSections.failure(undefined));
  }
}

export function* watchLoadMoreDraftSections() {
  yield takeLatest(getActionType(loadMoreDraftSections.request), handleLoadMoreDraft);
}
