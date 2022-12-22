import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { getDraftMegaMenu, loadMoreDraftMegaMenu } from 'containers/ChooseTemplate/store/actions';
import { megaMenuService } from 'services/MegaMenuService';
import { DevSection } from 'types/Sections';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

function* handleGetDraft(_: ReturnType<typeof getDraftMegaMenu.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.getDraftSections>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.getDraftSections,
      '',
    );
    const _responseData = response as DevSection[];
    const hasNextPage = _responseData.length > 0 ? true : false;

    yield put(getDraftMegaMenu.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    yield put(getDraftMegaMenu.failure(undefined));
  }
}
export function* watchGetDraftMegaMenu() {
  yield takeLatest(getActionType(getDraftMegaMenu.request), handleGetDraft);
}

function* handleLoadMoreDraft({ payload }: ReturnType<typeof loadMoreDraftMegaMenu.request>) {
  const { cursor } = payload;
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.loadMoreDraftSections>> = yield retry(
      3,
      1000,
      megaMenuService.mega_menu.loadMoreDraftSections,
      '',
      cursor,
    );
    const _responseData = response as DevSection[];
    const hasNextPage = _responseData.length > 0 ? true : false;
    yield put(loadMoreDraftMegaMenu.success({ data: _responseData, hasNextPage }));
  } catch (error) {
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(loadMoreDraftMegaMenu.failure(undefined));
  }
}

export function* watchLoadMoreDraftMegaMenu() {
  yield takeLatest(getActionType(loadMoreDraftMegaMenu.request), handleLoadMoreDraft);
}
