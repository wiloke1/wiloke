import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import { MODAL_REPORT_INITIALIZATION_SESSION_BUILDER_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { addMultiAddons } from 'store/global/themeAddons';
import { themeAddonsSelector, themeHeaderFooterSelector } from 'store/selectors';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { getActionType } from 'wiloke-react-core/utils';
import { getPage, setThemeAddonsToPages, setThemeHeaderFooterToPages } from '../../actions/actionPages';
import { handleGetPageAtom } from './PageAtom/handleGetPageAtom';
import { handleGetPageClient } from './PageClient/handleGetPageClient';
import { handleGetPageDraft } from './PageDraft/handleGetPageDraft';

// get page info
function* handleResult(params: ReturnType<typeof getPage.request>) {
  const { variant } = params.payload;
  const { role } = getUserInfo();
  try {
    if (variant === 'Atom') {
      yield call(handleGetPageAtom, params);
      return;
    }
    if (variant === 'Draft') {
      yield call(handleGetPageDraft, params);
      return;
    }

    if (variant === 'Client') {
      yield call(handleGetPageClient, params);

      const { data: addons }: ReturnType<typeof themeAddonsSelector> = yield select(themeAddonsSelector);
      const themeAddonsBody = addons.map(item => item.body).filter(Boolean) ?? [];

      yield put(addMultiAddons({ addons }));
      yield put(setThemeAddonsToPages(themeAddonsBody));

      const themeId = getPageInfo('themeId');
      const { footers, headers }: ReturnType<typeof themeHeaderFooterSelector> = yield select(themeHeaderFooterSelector);

      if (!!themeId) {
        yield put(setThemeHeaderFooterToPages({ footers, headers }));
      }
      return;
    }

    if (role === 'admin') {
      yield call(handleGetPageAtom, params);
      return;
    }

    if (role === 'dev') {
      yield call(handleGetPageDraft, params);
      return;
    }

    if (role === 'user') {
      yield call(handleGetPageClient, params);

      const { data: addons }: ReturnType<typeof themeAddonsSelector> = yield select(themeAddonsSelector);
      const themeAddonsBody = addons.map(item => item.body).filter(Boolean) ?? [];

      yield put(addMultiAddons({ addons }));
      yield put(setThemeAddonsToPages(themeAddonsBody));

      const themeId = getPageInfo('themeId');
      const { footers, headers }: ReturnType<typeof themeHeaderFooterSelector> = yield select(themeHeaderFooterSelector);

      if (!!themeId) {
        yield put(setThemeHeaderFooterToPages({ footers, headers }));
      }
      return;
    }
  } catch (error) {
    ModalReportAfterError.getActions(MODAL_REPORT_INITIALIZATION_SESSION_BUILDER_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.initialization_session_builder'),
      description: error instanceof Error ? error.message : '',
    });
  }
}

export function* watchResult() {
  yield takeLatest(getActionType(getPage.request), handleResult);
}
