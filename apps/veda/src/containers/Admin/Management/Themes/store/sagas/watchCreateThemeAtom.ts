import { all, put, retry, takeLatest } from 'redux-saga/effects';
import { createThemeAtom } from 'services/ThemeService/Logic/createThemeAtom';
import { importPageTemplateToThemeService } from 'services/ThemeService/Logic/importPageTemplateToThemeService';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { createThemeAtom as actionCreateThemeAtom } from '../actions/actionThemesAtom';
import { setModalCreateThemeAtom } from '../reducers/sliceThemesAtom';

function* handleCreateThemeAtom({ payload }: ReturnType<typeof actionCreateThemeAtom.request>) {
  const { label, pageCommandIds, featuredImage, themeSettings, globalJs, globalScss, vendors } = payload;
  try {
    const newPages: Array<Awaited<ReturnType<typeof importPageTemplateToThemeService>>> = yield all(
      pageCommandIds.map(pageCommandId => {
        return retry(3, 1000, importPageTemplateToThemeService, { commandId: pageCommandId });
      }),
    );

    const newCommandIds = newPages.map(page => page.commandId);

    const response: Awaited<ReturnType<typeof createThemeAtom>> = yield retry(3, 1000, createThemeAtom, {
      themeSettings,
      featuredImage,
      globalJs,
      globalScss,
      label,
      pageCommandIds: newCommandIds,
      vendors,
    });

    yield put(actionCreateThemeAtom.success({ data: response }));
    yield put(setModalCreateThemeAtom(false));

    notifyAxiosHandler.handleSuccess(i18n.t('general.create', { text: i18n.t('general.successfully') }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionCreateThemeAtom.failure(undefined));
  }
}

export function* watchCreateThemeAtom() {
  yield takeLatest(getActionType(actionCreateThemeAtom.request), handleCreateThemeAtom);
}
