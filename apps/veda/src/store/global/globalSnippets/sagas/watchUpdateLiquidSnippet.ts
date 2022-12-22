import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { snippetService } from 'services/SnippetService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateLiquidSnippet } from '../action';

function* handleUpdateLiquidSnippets({ payload: { fileName, liquidContent } }: ReturnType<typeof updateLiquidSnippet.request>) {
  try {
    const response: SagaReturnType<typeof snippetService.updateSnippet> = yield retry(3, 1000, snippetService.updateSnippet, {
      fileName,
      data: liquidContent,
    });
    yield put(updateLiquidSnippet.success({ fileName, liquidContent }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(updateLiquidSnippet.failure(undefined));
  }
}

export function* watchUpdateLiquidSnippet() {
  yield takeLatest(getActionType(updateLiquidSnippet.request), handleUpdateLiquidSnippets);
}
