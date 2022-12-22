import { call } from 'redux-saga/effects';
import { getPage } from 'store/actions/actionPages';
import { isPageBuilder, isThemeBuilder } from 'utils/validateBuilderMode';
import { handleGetPageDraft_ } from './handleGetPageDraft_';
import { handleGetPageOfThemeDraft_ } from './handleGetPageOfThemeDraft_';

export function* handleGetPageDraft(params: ReturnType<typeof getPage.request>) {
  if (isThemeBuilder()) {
    yield call(handleGetPageOfThemeDraft_, params);
    return;
  }
  if (isPageBuilder()) {
    yield call(handleGetPageDraft_, params);
    return;
  }
}
