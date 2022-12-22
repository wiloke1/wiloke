import { put, retry, select, takeLeading } from '@redux-saga/core/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getThemeObjectNCss } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import { Theme } from 'utils/LiquidSyntaxToTwig';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

export function* handleGetThemeObjectNCss({ payload }: ReturnType<typeof getThemeObjectNCss.request>) {
  const { variant } = payload;
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { statusRequestThemeCssObject, data } = liquidVariablesSelectors;
  if (statusRequestThemeCssObject === 'success' && data.themeCss && variant === 'Action chạy khi vào build hoặc vào client theme manager') {
    yield put(getThemeObjectNCss.success({ themeCss: data.themeCss, theme: data.theme }));
    return;
  }

  try {
    const { theme }: Awaited<ReturnType<typeof liquidVariables.getThemeObject>> = yield retry(3, 1000, liquidVariables.getThemeObject);
    const { url }: Awaited<ReturnType<typeof liquidVariables.getThemeCss>> = yield retry(3, 1000, liquidVariables.getThemeCss, {
      themeId: theme.id,
    });
    yield put(getThemeObjectNCss.success({ themeCss: url, theme: theme as Theme }));
  } catch (error) {
    if (notifyAxiosHandler.isAxiosError(error)) {
      yield put(getThemeObjectNCss.failure(undefined));
    } else {
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetThemeObjectNCss() {
  yield takeLeading(getActionType(getThemeObjectNCss.request), handleGetThemeObjectNCss);
}
