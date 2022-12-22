import { call, select, take, put, retry, takeEvery } from 'redux-saga/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getLiquidTranslationsObject, getThemeObjectNCss, setSlugsRequest } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector, themeSettingsSelector } from 'store/selectors';
import { getLocale } from 'translation';
import { TRANSLATION_KEY } from 'utils/constants/constants';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* waitForThemeId() {
  const { data }: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  if (data.theme?.id) {
    return;
  }
  while (true) {
    yield take(getActionType(getThemeObjectNCss.success));
    return;
  }
}

/** NOTE: Nếu update function này thì xem xét việc update PageLiquidVariable tại  để code có thể clean hơn */
export function* handleGetTranslationObject({ payload }: ReturnType<typeof getLiquidTranslationsObject.request>) {
  const { globalTranslations }: ReturnType<typeof themeSettingsSelector> = yield select(themeSettingsSelector);
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { translationLocalesLoaded, translationLocalesLoading, translationLocalesFailed, data } = liquidVariablesSelectors;
  const { translations } = data;
  const locale = payload.locale ?? translationLocalesFailed[0] ?? getLocale();

  let globalTranslation = {};
  try {
    globalTranslation = JSON.parse(globalTranslations.translation[locale] ?? JSON.stringify({}));
  } catch {
    globalTranslation = {};
  }

  if (translationLocalesLoaded.includes(locale)) {
    yield put(
      getLiquidTranslationsObject.success({
        data: {
          [locale]: {
            ...translations[locale],
            [TRANSLATION_KEY]: globalTranslation,
          },
        },
      }),
    );
    return;
  }
  if (translationLocalesLoading.includes(locale)) {
    return;
  }

  // Đánh dấu các slug đang trạng thái loading
  yield put(setSlugsRequest.request({ translation: locale }));
  yield call(waitForThemeId);
  const liquidVariablesSelectorsAfterRequestTheme: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const themeId = liquidVariablesSelectorsAfterRequestTheme.data.theme?.id;
  try {
    const translationContent: Awaited<ReturnType<typeof liquidVariables.getTranslationObject>> = yield retry(
      3,
      1000,
      liquidVariables.getTranslationObject,
      { locale, themeId: Number(themeId) },
    );

    yield put(
      getLiquidTranslationsObject.success({
        data: {
          [locale]: {
            ...translationContent,
            [TRANSLATION_KEY]: globalTranslation,
          },
        },
      }),
    );
    // Đánh dấu những slug đã được load
    yield put(setSlugsRequest.success({ translation: locale }));
  } catch (error) {
    console.log('watchGetTranslationObject', error);
    yield put(getLiquidTranslationsObject.failure(undefined));
    if (notifyAxiosHandler.isAxiosError(error)) {
      // Đánh dấu những slug load bị lỗi
      yield put(setSlugsRequest.failure({ translation: locale }));
    } else {
      yield put(setSlugsRequest.otherException({ translation: locale }));
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetTranslationObject() {
  yield takeEvery(getActionType(getLiquidTranslationsObject.request), handleGetTranslationObject);
}
