import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { deletePageFavorite } from 'services/PageService/Logic/deleteFavorite';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteFavoritePage } from '../reducers/actions';

function* handleAction({ payload: { commandId } }: ReturnType<typeof deleteFavoritePage.request>) {
  try {
    const response: SagaReturnType<typeof deletePageFavorite> = yield retry(3, 1000, deletePageFavorite, { commandId });
    yield put(deleteFavoritePage.success({ commandId }));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(deleteFavoritePage.failure({ commandId }));
  }
}

export function* watchDeleteMyTemplatePage() {
  yield takeLatest(getActionType(deleteFavoritePage.request), handleAction);
}
