import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { snippetService } from 'services/SnippetService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createLiquidSnippet } from '../action';

function* handleCreateLiquidSnippets({ payload: { fileName, liquidContent } }: ReturnType<typeof createLiquidSnippet.request>) {
  try {
    const response: SagaReturnType<typeof snippetService.createSnippet> = yield retry(3, 1000, snippetService.createSnippet, {
      fileName,
      data: liquidContent,
    });
    yield put(createLiquidSnippet.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(createLiquidSnippet.failure(undefined));
  }
}

export function* watchCreateLiquidSnippet() {
  yield takeLatest(getActionType(createLiquidSnippet.request), handleCreateLiquidSnippets);
}
