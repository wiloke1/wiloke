import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { snippetService } from 'services/SnippetService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { updateLiquidSnippetFileName } from '../action';

function* handleUpdateLiquidSnippets({ payload: { newFileName, oldFileName } }: ReturnType<typeof updateLiquidSnippetFileName.request>) {
  try {
    const response: SagaReturnType<typeof snippetService.updateSnippetFileName> = yield retry(3, 1000, snippetService.updateSnippetFileName, {
      newFileName,
      oldFileName,
    });
    yield put(updateLiquidSnippetFileName.success({ newFileName, oldFileName }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(updateLiquidSnippetFileName.failure(undefined));
  }
}

export function* watchUpdateLiquidSnippetFileName() {
  yield takeLatest(getActionType(updateLiquidSnippetFileName.request), handleUpdateLiquidSnippets);
}
