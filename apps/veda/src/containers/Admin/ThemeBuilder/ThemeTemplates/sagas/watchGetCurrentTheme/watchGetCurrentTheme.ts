import { call, takeLatest } from 'redux-saga/effects';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCurrentTheme } from '../../actions';
import { handleGetThemeAtom } from './ThemeAtom/handleGetThemeAtom';
import { handleGetThemeClient } from './ThemeClient/handleGetThemeClient';
import { handleGetThemeDraft } from './ThemeDraft/handleGetThemeDraft';

function* handleGetTheme(params: ReturnType<typeof actionGetCurrentTheme.request>) {
  const { variant } = params.payload;
  const { role } = getUserInfo();

  if (variant === 'Atom') {
    yield call(handleGetThemeAtom, params);
    return;
  }
  if (variant === 'Draft') {
    yield call(handleGetThemeDraft, params);
    return;
  }
  if (variant === 'Client') {
    yield call(handleGetThemeClient, params);
    return;
  }
  if (role === 'admin') {
    yield call(handleGetThemeAtom, params);
    return;
  }
  if (role === 'dev') {
    yield call(handleGetThemeDraft, params);
    return;
  }
  if (role === 'user') {
    yield call(handleGetThemeClient, params);
    return;
  }
}

export function* watchGetCurrentTheme() {
  yield takeLatest(getActionType(actionGetCurrentTheme.request), handleGetTheme);
}
