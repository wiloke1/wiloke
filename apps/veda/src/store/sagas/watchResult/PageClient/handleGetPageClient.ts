import { call } from '@redux-saga/core/effects';
import { getPage } from 'store/actions/actionPages';
import { isPageBuilder, isThemeBuilder } from 'utils/validateBuilderMode';
import { handleGetPageClientUseAtomTemplate_ } from './handleGetPageClientUseAtomTemplate_';
import { handleGetPageClient_ } from './handleGetPageClient_';
import { handleGetPageOfThemeClient_ } from './handleGetPageOfThemeClient_';

export function* handleGetPageClient(params: ReturnType<typeof getPage.request>) {
  const { isAdminTemplate } = params.payload;
  if (isThemeBuilder()) {
    yield call(handleGetPageOfThemeClient_, params);
    return;
  }
  if (isPageBuilder()) {
    if (!!isAdminTemplate) {
      yield call(handleGetPageClientUseAtomTemplate_, params);
      return;
    } else {
      yield call(handleGetPageClient_, params);
      return;
    }
  }
}
