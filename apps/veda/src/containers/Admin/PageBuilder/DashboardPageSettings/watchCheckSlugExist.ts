import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import resultService from 'services/ResultService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { checkSlugExist } from './slice';

function* handleCheck({ payload }: ReturnType<typeof checkSlugExist.request>) {
  const { commandId, handle, pageType, callback } = payload;
  try {
    const response: Awaited<ReturnType<typeof resultService.checkExistSlugPage>> = yield call(resultService.checkExistSlugPage, {
      commandId,
      handle,
      pageType,
    });
    if (response.status === 200) {
      yield put(checkSlugExist.success(undefined));
      callback?.();
    } else {
      notifyAxiosHandler.handleErrorDetail({ error: response.data.message });
    }
  } catch (error) {
    yield put(checkSlugExist.failure(undefined));
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
  }
}

export function* watchCheckSlugExist() {
  yield takeLatest(getActionType(checkSlugExist.request), handleCheck);
}
