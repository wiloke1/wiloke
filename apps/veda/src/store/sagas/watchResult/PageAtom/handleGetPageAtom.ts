import { call } from 'redux-saga/effects';
import { getPage } from 'store/actions/actionPages';
import { isPageBuilder, isThemeBuilder } from 'utils/validateBuilderMode';
import { handleGetPageAtom_ } from './handleGetPageAtom_';
import { handleGetPageOfThemeAtom_ } from './handleGetPageOfThemeAtom_';

// Điều hướng
export function* handleGetPageAtom(params: ReturnType<typeof getPage.request>) {
  if (isThemeBuilder()) {
    yield call(handleGetPageOfThemeAtom_, params);
    return;
  }
  if (isPageBuilder()) {
    yield call(handleGetPageAtom_, params);
    return;
  }
}
