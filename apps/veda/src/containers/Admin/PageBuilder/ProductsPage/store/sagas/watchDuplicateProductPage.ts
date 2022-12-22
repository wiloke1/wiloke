import { getActionType } from 'wiloke-react-core/utils';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { AdminPageData } from 'containers/Admin/types';
import { pagesBuilderService } from 'services/PagesBuilderService';

import { actionDuplicateProductPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionDuplicateProductPage.request>) {
  const { name, id } = payload;
  try {
    const data: AdminPageData = yield call(pagesBuilderService.duplicateItem, name);
    yield put(actionDuplicateProductPage.success({ item: data, parentId: id }));
  } catch (error) {
    yield put(actionDuplicateProductPage.failure({ parentId: id }));
  }
}

export function* watchDuplicateProductPage() {
  yield takeLatest(getActionType(actionDuplicateProductPage.request), handleCreate);
}
