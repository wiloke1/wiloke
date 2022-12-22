import { put, retry, select, takeLeading } from '@redux-saga/core/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getLocalizationObject } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

export function* handleGetLocalizationObject(_: ReturnType<typeof getLocalizationObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { statusRequestLocalizationObject, data } = liquidVariablesSelectors;
  if (statusRequestLocalizationObject === 'success' && data.localization) {
    yield put(getLocalizationObject.success({ localization: data.localization }));
    return;
  }
  try {
    const response: Awaited<ReturnType<typeof liquidVariables.getLocalizationObject>> = yield retry(3, 1000, liquidVariables.getLocalizationObject);
    yield put(getLocalizationObject.success({ localization: response.localization }));
  } catch (error) {
    if (notifyAxiosHandler.isAxiosError(error)) {
      yield put(getLocalizationObject.failure(undefined));
    } else {
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetLocalizationObject() {
  yield takeLeading(getActionType(getLocalizationObject.request), handleGetLocalizationObject);
}
