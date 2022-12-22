import { put, retry, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createAdminSectionChangelog, getAdminSectionChangelog } from '../../actions';

function* handleGetSectionChangelog({ payload: { commandId } }: ReturnType<typeof getAdminSectionChangelog.request>) {
  try {
    const response: Awaited<ReturnType<typeof sectionService.changelogs.getChangelogsOfAtom>> = yield retry(
      3,
      1000,
      sectionService.changelogs.getChangelogsOfAtom,
      commandId,
    );
    yield put(getAdminSectionChangelog.success(response.data));
  } catch (error) {
    yield put(getAdminSectionChangelog.failure(undefined));
  }
}

export function* watchGetAdminSectionChangelog() {
  yield takeLatest(getActionType(getAdminSectionChangelog.request), handleGetSectionChangelog);
}

function* handleCreateChangelog({ payload }: ReturnType<typeof createAdminSectionChangelog.request>) {
  const { content, version, versionId } = payload;
  try {
    const response: Awaited<ReturnType<typeof sectionService.changelogs.createChangelogOfAtom>> = yield retry(
      3,
      1000,
      sectionService.changelogs.createChangelogOfAtom,
      {
        content,
        version,
        versionId,
      },
    );
    yield put(createAdminSectionChangelog.success(response.info));
    notifyAxiosHandler.handleSuccess(response.message);
  } catch (error) {
    console.log(error);
    yield put(createAdminSectionChangelog.failure(undefined));
  }
}

export function* watchCreateAtomChangelog() {
  yield takeLatest(getActionType(createAdminSectionChangelog.request), handleCreateChangelog);
}
