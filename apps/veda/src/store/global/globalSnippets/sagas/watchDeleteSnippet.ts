import { AxiosError } from 'axios';
import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { snippetService } from 'services/SnippetService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteLiquidSnippet } from '../action';

function* handleDeleteLiquidSnippets({ payload: { fileName } }: ReturnType<typeof deleteLiquidSnippet.request>) {
  try {
    const response: SagaReturnType<typeof snippetService.deleteSnippet> = yield retry(3, 1000, snippetService.deleteSnippet, {
      fileName,
    });
    yield put(deleteLiquidSnippet.success({ fileName }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(deleteLiquidSnippet.failure(undefined));
  }
}

export function* watchDeleteLiquidSnippet() {
  yield takeLatest(getActionType(deleteLiquidSnippet.request), handleDeleteLiquidSnippets);
}
