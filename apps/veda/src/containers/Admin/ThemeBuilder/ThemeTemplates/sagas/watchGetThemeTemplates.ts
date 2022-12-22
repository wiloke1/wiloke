import { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { baseUrl } from 'services/ThemeService/VedaApplication/user/ThemeController/const';
import fetchAPI from 'utils/functions/fetchAPI';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetThemeTemplates } from '../actions';

// TODO: Tách user thành 1 app riêng và nội bộ là 1 app riêng
function* handleGet(_: ReturnType<typeof actionGetThemeTemplates.request>) {
  try {
    const response: AxiosResponse<{ info: any[]; message: string }> = yield retry(3, 1000, fetchAPI.request, {
      url: `${baseUrl}`,
    });
    yield put(
      actionGetThemeTemplates.success({
        data: response.data.info.map(item => ({ ...item, name: item.label })),
        maxPages: 1,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    console.log('error_', error_);
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetThemeTemplates.failure(undefined));
  }
}

export function* watchGetThemeTemplates() {
  yield takeLatest(getActionType(actionGetThemeTemplates.request), handleGet);
}
