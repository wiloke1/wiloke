import { all, put, retry, takeLatest } from 'redux-saga/effects';
import { i18n } from 'translation';
import { appendPageToThemeDraft } from 'services/ThemeService/Logic/appendPageToThemeDraft';
import { importPageTemplateToThemeService } from 'services/ThemeService/Logic/importPageTemplateToThemeService';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { appendPageToThemeDraft as actionAppendPageToThemeDraft } from '../actions/actionThemesDraft';
import { setModalAppendPageToThemeDraft } from '../reducers/sliceThemesDraft';

function* handleAppendPageToThemeDraft({ payload }: ReturnType<typeof actionAppendPageToThemeDraft.request>) {
  const { featuredImage, label, pageCommandIdsNeedImport } = payload;
  const { pageCommandIds: prevPageCommandIds, commandId } = payload.prevThemeData;

  try {
    const newPages: Array<Awaited<ReturnType<typeof importPageTemplateToThemeService>>> = yield all(
      pageCommandIdsNeedImport.map(pageCommandId => {
        return retry(3, 1000, importPageTemplateToThemeService, { commandId: pageCommandId });
      }),
    );
    const newPageCommandIds = newPages.map(page => page.commandId);

    const response: Awaited<ReturnType<typeof appendPageToThemeDraft>> = yield retry(3, 1000, appendPageToThemeDraft, {
      theme: {
        featuredImage,
        label,
        pageCommandIds: prevPageCommandIds.concat(...newPageCommandIds),
        commandId,
      },
    });

    yield put(actionAppendPageToThemeDraft.success({ data: response }));
    yield put(setModalAppendPageToThemeDraft(undefined));
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionAppendPageToThemeDraft.failure(undefined));
  }
}

export function* watchAppendPageToThemeDraft() {
  yield takeLatest(getActionType(actionAppendPageToThemeDraft.request), handleAppendPageToThemeDraft);
}
