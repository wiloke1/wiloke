import { put, retry, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createAdminMegaMenuChangelog } from '../../actions';

function* handleCreateChangelog({ payload: { content, version, versionId } }: ReturnType<typeof createAdminMegaMenuChangelog.request>) {
  try {
    const response: Awaited<ReturnType<typeof megaMenuService.changelogs.createChangelogOfAtom>> = yield retry(
      3,
      1000,
      megaMenuService.changelogs.createChangelogOfAtom,
      { content, version, versionId },
    );
    yield put(createAdminMegaMenuChangelog.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(createAdminMegaMenuChangelog.failure(undefined));
  }
}

export function* watchCreateAdminMegaMenuChangelog() {
  yield takeLatest(getActionType(createAdminMegaMenuChangelog.request), handleCreateChangelog);
}
