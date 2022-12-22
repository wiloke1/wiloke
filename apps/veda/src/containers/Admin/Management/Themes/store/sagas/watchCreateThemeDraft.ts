import { all, put, retry, takeLatest } from 'redux-saga/effects';
import { createThemeDraft } from 'services/ThemeService/Logic/createThemeDraft';
import { importPageTemplateToThemeService } from 'services/ThemeService/Logic/importPageTemplateToThemeService';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createThemeDraft as actionCreateThemeDraft } from '../actions/actionThemesDraft';
import { setModalCreateThemeDraft } from '../reducers/sliceThemesDraft';

function* handleCreateThemeDraft({ payload }: ReturnType<typeof actionCreateThemeDraft.request>) {
  const { label, pageCommandIds, featuredImage, themeSettings, globalJs, globalScss, vendors } = payload;
  try {
    const newPages: Array<Awaited<ReturnType<typeof importPageTemplateToThemeService>>> = yield all(
      pageCommandIds.map(pageCommandId => {
        return retry(3, 1000, importPageTemplateToThemeService, { commandId: pageCommandId });
      }),
    );

    const newCommandIds = newPages.map(page => page.commandId);

    const response: Awaited<ReturnType<typeof createThemeDraft>> = yield retry(3, 1000, createThemeDraft, {
      themeSettings,
      featuredImage,
      globalJs,
      globalScss,
      label,
      pageCommandIds: newCommandIds,
      vendors,
    });

    yield put(actionCreateThemeDraft.success({ data: response }));
    yield put(setModalCreateThemeDraft(false));
    notifyAxiosHandler.handleSuccess(i18n.t('general.create', { text: i18n.t('general.successfully') }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionCreateThemeDraft.failure(undefined));
  }
}

export function* watchCreateThemeDraft() {
  yield takeLatest(getActionType(actionCreateThemeDraft.request), handleCreateThemeDraft);
}
