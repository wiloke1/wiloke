import { put, retry, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createAdminAddonChangelog } from '../../actions';

function* handleCreateChangelog({ payload: { content, version, versionId } }: ReturnType<typeof createAdminAddonChangelog.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.changelogs.createChangelogOfAtom>> = yield retry(
      3,
      1000,
      addonService.changelogs.createChangelogOfAtom,
      { content, version, versionId },
    );

    yield put(createAdminAddonChangelog.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    yield put(createAdminAddonChangelog.failure(undefined));
  }
}

export function* watchCreateAdminAddonChangelog() {
  yield takeLatest(getActionType(createAdminAddonChangelog.request), handleCreateChangelog);
}
