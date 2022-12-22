import { all, put, retry, takeLatest } from 'redux-saga/effects';
import { i18n } from 'translation';
import { appendPageToThemeAtom } from 'services/ThemeService/Logic/appendPageToThemeAtom';
import { importPageTemplateToThemeService } from 'services/ThemeService/Logic/importPageTemplateToThemeService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { appendPageToThemeAtom as actionAppendPageToThemeAtom } from '../actions/actionThemesAtom';
import { setModalAppendPageToThemeAtom } from '../reducers/sliceThemesAtom';

function* handleAppendPageToThemeAtom({ payload }: ReturnType<typeof actionAppendPageToThemeAtom.request>) {
  const { featuredImage, label, pageCommandIdsNeedImport } = payload;
  const { pageCommandIds: prevPageCommandIds, commandId } = payload.prevThemeData;

  try {
    const newPages: Array<Awaited<ReturnType<typeof importPageTemplateToThemeService>>> = yield all(
      pageCommandIdsNeedImport.map(pageCommandId => {
        return retry(3, 1000, importPageTemplateToThemeService, { commandId: pageCommandId });
      }),
    );
    const newPageCommandIds = newPages.map(page => page.commandId);

    const response: Awaited<ReturnType<typeof appendPageToThemeAtom>> = yield retry(3, 1000, appendPageToThemeAtom, {
      theme: {
        featuredImage,
        label,
        pageCommandIds: prevPageCommandIds.concat(...newPageCommandIds),
        commandId,
      },
    });

    yield put(actionAppendPageToThemeAtom.success({ data: response }));
    yield put(setModalAppendPageToThemeAtom(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionAppendPageToThemeAtom.failure(undefined));
  }
}

export function* watchAppendPageToThemeAtom() {
  yield takeLatest(getActionType(actionAppendPageToThemeAtom.request), handleAppendPageToThemeAtom);
}
