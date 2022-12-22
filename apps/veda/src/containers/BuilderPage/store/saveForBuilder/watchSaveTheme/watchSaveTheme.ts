import { MODAL_REPORT_SAVE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { call, takeLatest } from 'redux-saga/effects';
import { i18n } from 'translation';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { getActionType } from 'wiloke-react-core/utils';
import { saveTheme } from '../actions';
import { handleSaveThemeAtom } from './ThemeAtom/handleSaveThemeAtom';
import { handleSaveThemeClient } from './ThemeClient/handleSaveThemeClient';
import { handleSaveThemeDraft } from './ThemeDraft/handleSaveThemeDraft';

function* handleSaveTheme(params: ReturnType<typeof saveTheme.request>) {
  const { variant } = params.payload;
  const { role } = getUserInfo();

  try {
    if (variant === 'Atom') {
      yield call(handleSaveThemeAtom, params);
      return;
    }
    if (variant === 'Draft') {
      yield call(handleSaveThemeDraft, params);
      return;
    }
    if (variant === 'Client') {
      yield call(handleSaveThemeClient, params);
      return;
    }

    if (role === 'admin') {
      yield call(handleSaveThemeAtom, params);
      return;
    }
    if (role === 'dev') {
      yield call(handleSaveThemeDraft, params);
      return;
    }
    if (variant === 'user') {
      yield call(handleSaveThemeClient, params);
      return;
    }
  } catch (error) {
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error instanceof Error ? error.message : '',
    });
  }
}

export function* watchSaveTheme() {
  yield takeLatest(getActionType(saveTheme.request), handleSaveTheme);
}
