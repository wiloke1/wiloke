import { getActionType } from 'wiloke-react-core/utils';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { AdminPageData } from 'containers/Admin/types';
import { pagesBuilderService } from 'services/PagesBuilderService';

import { actionDuplicateCollectionPage } from '../actions';

function* handleCreate({ payload }: ReturnType<typeof actionDuplicateCollectionPage.request>) {
  const { name, id } = payload;
  try {
    const data: AdminPageData = yield call(pagesBuilderService.duplicateItem, name);
    yield put(actionDuplicateCollectionPage.success({ item: data, parentId: id }));
  } catch (error) {
    yield put(actionDuplicateCollectionPage.failure({ parentId: id }));
  }
}

export function* watchDuplicateCollectionPage() {
  yield takeLatest(getActionType(actionDuplicateCollectionPage.request), handleCreate);
}
