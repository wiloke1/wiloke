import { retry, put, takeLatest } from '@redux-saga/core/effects';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { getPagesPublish } from 'services/PageService/Logic/getProductsPublish';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetTemplatesPopup } from '../actions/actionTemplate';

function* handleGetTemplateAdmin({ payload }: ReturnType<typeof actionGetTemplatesPopup.request>) {
  const { type } = payload;

  try {
    const response: Awaited<ReturnType<typeof getPagesPublish>> = yield retry(3, 1000, getPagesPublish, { pageType: type });
    yield put(actionGetTemplatesPopup.success({ data: response.info as ServerTemplateResponse[] }));
  } catch (error) {
    yield put(actionGetTemplatesPopup.failure(undefined));
  }
}

export function* watchGetTemplatesBlank() {
  yield takeLatest(getActionType(actionGetTemplatesPopup.request), handleGetTemplateAdmin);
}
