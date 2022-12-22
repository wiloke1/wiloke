import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { snippetService } from 'services/SnippetService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getLiquidSnippets } from '../action';

export function* handleGetLiquidSnippets({ payload: { fileNames, keyword, size, showNotify } }: ReturnType<typeof getLiquidSnippets.request>) {
  try {
    const response: SagaReturnType<typeof snippetService.getSnipptes> = yield retry(3, 1000, snippetService.getSnipptes, {
      fileNames,
      keyword,
      size,
    });
    yield put(getLiquidSnippets.success(response.info));
    if (showNotify) {
      notifyAxiosHandler.handleSuccess(response.message);
    }
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(getLiquidSnippets.failure(undefined));
  }
}

export function* watchGetLiquidSnippets() {
  yield takeLatest(getActionType(getLiquidSnippets.request), handleGetLiquidSnippets);
}
