import { notification } from 'antd';
import { AxiosError } from 'axios';
import { call, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { mediaService } from 'services/MediaService';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { v4 } from 'uuid';
import { getActionType } from 'wiloke-react-core/utils';
import { removeBackground } from '../actions/actionMyMedia';
import { handleUploadFileToMyMedia } from './watchUploadFileToMyMedia';

function* handleRemove({ payload: { data, id, name } }: ReturnType<typeof removeBackground.request>) {
  try {
    const fileResponse: SagaReturnType<typeof mediaService.removeBackground> = yield retry(3, 1000, mediaService.removeBackground, data, name);

    yield call(handleUploadFileToMyMedia, {
      type: '@MyMedia/uploadFileToMyMediaRequest',
      payload: {
        file: fileResponse,
        uniqId: v4(),
        onSuccess: () => {
          notifyAxiosHandler.handleSuccess('remove background success');
        },
        onFailure: () => {
          notification.error({
            message: `Upload failed: ${fileResponse.name}`,
            key: fileResponse.name,
          });
        },
      },
    });
    yield put(removeBackground.success({ id }));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(removeBackground.failure({ id }));
  }
}

export function* watchRemoveBackground() {
  yield takeLatest(getActionType(removeBackground.request), handleRemove);
}
