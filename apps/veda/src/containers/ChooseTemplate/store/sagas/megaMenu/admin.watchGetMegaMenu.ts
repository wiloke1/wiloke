import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { getAdminMegaMenu, loadMoreAdminMegaMenu } from 'containers/ChooseTemplate/store/actions';
import { megaMenuService } from 'services/MegaMenuService';
import { AdminSection } from 'types/Sections';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGetAdmin(_: ReturnType<typeof getAdminMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.getAtomSections>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.getAtomSections,
      '',
    );
    const _responseData = response as AdminSection[];
    const hasNextPage = _responseData.length > 0 ? true : false;

    yield put(getAdminMegaMenu.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(getAdminMegaMenu.failure(undefined));
  }
}

function* handleLoadMoreAdmin({ payload }: ReturnType<typeof loadMoreAdminMegaMenu.request>) {
  const { cursor } = payload;

  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.loadMoreAtomSections>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.loadMoreAtomSections,
      '',
      cursor,
    );
    const _responseData = response as AdminSection[];
    const hasNextPage = _responseData.length > 0 ? true : false;
    yield put(loadMoreAdminMegaMenu.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(loadMoreAdminMegaMenu.failure(undefined));
  }
}

export function* watchGetAdminMegaMenu() {
  yield takeLatest(getActionType(getAdminMegaMenu.request), handleGetAdmin);
}

export function* watchLoadMoreAdminMegaMenu() {
  yield takeLatest(getActionType(loadMoreAdminMegaMenu.request), handleLoadMoreAdmin);
}
