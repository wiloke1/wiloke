import { MODAL_REPORT_SAVE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { Task } from 'redux-saga';
import { all, call, cancel, fork, put, retry, select, take } from 'redux-saga/effects';
import { mediaService } from 'services/MediaService';
import { createMegamenuOfPageDraft } from 'services/PageService/Logic/createMegamenuOfPageDraft';
import { createPageDraft } from 'services/PageService/Logic/createPageDraft';
import { createSectionOfPageDraft } from 'services/PageService/Logic/createSectionOfPageDraft';
import { deleteMegaMenusOfPageDraft } from 'services/PageService/Logic/deleteMegaMenusOfPageDraft';
import { deleteSectionsOfPageDraft } from 'services/PageService/Logic/deleteSectionsOfPageDraft';
import { updateMegamenuOfPageDraft } from 'services/PageService/Logic/updateMegamenuOfPageDraft';
import { updatePageDraft } from 'services/PageService/Logic/updatePageDraft';
import { updateSectionOfPageDraft } from 'services/PageService/Logic/updateSectionOfPageDraft';
import { addMegaMenusToPage, removeDeletedSectionAddonMegaMenuCommandIds, setPage, updateMainSectionsToPages } from 'store/actions/actionPages';
import { setVendors } from 'store/actions/actionVendors';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { syncToShopify } from 'store/global/socket/actions';
import { syncPageNotification } from 'store/global/socket/watchSyncToShopify';
import { pageSectionsSelector, pagesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevPage } from 'types/Page';
import { PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { isDefault, isMain } from 'utils/functions/checkSectionType';
import { deepFind } from 'utils/functions/deepFind';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { removeDuplicateByKey } from 'utils/functions/removeDuplicate';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { savePageForDev } from './actions';

interface SaveSectionOfPageDraft {
  section: PageSection;
  megaMenus: PageSection[];
}

function* handleSaveSectionOfPageDraft(section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, variant: 'Create' | 'Update') {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(section, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfPageDraft | typeof updateMegamenuOfPageDraft>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId && variant === 'Update') {
        return retry(3, 1000, updateMegamenuOfPageDraft, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      } else {
        return retry(3, 1000, createMegamenuOfPageDraft, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      }
    }),
  );
  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);

  /** Xử lý lưu section */
  if (section.commandId && variant === 'Update') {
    const response: Awaited<ReturnType<typeof updateSectionOfPageDraft>> = yield retry(3, 1000, updateSectionOfPageDraft, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return {
      section: response,
      megaMenus: megamenuResponses,
    };
  } else {
    const response: Awaited<ReturnType<typeof createSectionOfPageDraft>> = yield retry(3, 1000, createSectionOfPageDraft, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return {
      section: response,
      megaMenus: megamenuResponses,
    };
  }
}

function* handleCreatePageDraft({ payload }: ReturnType<typeof savePageForDev.request>) {
  const { page, settings, outputBuilder, isOverrideIndividualPages, onFulfill } = payload;
  const mainSections = page.sections.filter(section => isMain(section.type) || isDefault(section.type));
  try {
    const { role } = getUserInfo();

    const { url }: Awaited<ReturnType<typeof mediaService.uploadBase64ScreenshotToMyMedia>> = yield call(
      mediaService.uploadBase64ScreenshotToMyMedia,
      { base64: page.image.src },
      role,
    );

    /** Xử lý lưu section & megamenu */
    // TODO: Utils transform thay vì ép kiểu
    let sectionResponse: PageSection[] = [];
    let megaMenusResponse: PageSection[] = [];

    for (const section of mainSections) {
      const response: SaveSectionOfPageDraft = yield call(
        handleSaveSectionOfPageDraft,
        section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        'Create',
      );

      sectionResponse = sectionResponse.concat(response.section);
      megaMenusResponse = megaMenusResponse.concat(response.megaMenus).flat();
    }

    yield put(updateMainSectionsToPages({ sections: sectionResponse, pageId: page.commandId }));

    /** Xử lý lưu page */
    const response: Awaited<ReturnType<typeof createPageDraft>> = yield retry(3, 1000, createPageDraft, {
      page: {
        ...page,
        image: { ...page.image, src: url },
        sections: sectionResponse.length > 0 ? sectionResponse : [],
        enable: true,
      },
      pageSettings: settings,
    });

    const { info } = response;

    if (info.pageSettings) {
      yield put(setGeneralSettingsPage({ settings: info.pageSettings.generalSettings }));
      yield put(setVendors({ vendors: info.pageSettings.vendors }));
      yield put(setGlobalJs({ js: info.pageSettings.globalJs }));
      yield put(setGlobalScss({ scss: info.pageSettings.globalScss }));
    }

    yield put(
      setPage({
        ...page,
        commandId: info.commandId,
        sections: removeDuplicateByKey([...page.sections, ...sectionResponse], 'id'),
        type: info.type,
      }),
    );
    yield put(addMegaMenusToPage(megaMenusResponse));

    const outputBuilderAfterResponse: typeof outputBuilder = {
      ...outputBuilder,
      pages: {
        ...outputBuilder.pages,
        [page.commandId]: {
          ...outputBuilder.pages[page.commandId],
          atomicCss: outputBuilder.pages[page.commandId].atomicCss,
          data: {
            ...outputBuilder.pages[page.commandId].data,
            page: {
              ...page,
              commandId: response.info.commandId,
            },
          },
          files: outputBuilder.pages[page.commandId].files,
        },
      },
    };

    yield put(
      syncToShopify.request({
        result: outputBuilderAfterResponse,
        isOverrideIndividualPages,
        onSyncFulfill: () => {
          onFulfill?.({
            ...page,
            ...((response.info as unknown) as DevPage),
            commandId: response.info.commandId,
          });
        },
      }),
    );

    yield put(savePageForDev.success(undefined));
  } catch (error) {
    syncPageNotification.done();
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(savePageForDev.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
  }
}

function* handleUpdatePageDraft({ payload }: ReturnType<typeof savePageForDev.request>) {
  const { page, settings, outputBuilder, isOverrideIndividualPages, onFulfill } = payload;
  const mainSections = page.sections.filter(section => isMain(section.type) || isDefault(section.type));
  try {
    const { role } = getUserInfo();

    const { url }: Awaited<ReturnType<typeof mediaService.uploadBase64ScreenshotToMyMedia>> = yield call(
      mediaService.uploadBase64ScreenshotToMyMedia,
      { base64: page.image.src },
      role,
    );

    const { deletedMegaMenuCommandIds, deletedSectionCommandIds }: ReturnType<typeof pagesSelector> = yield select(pagesSelector);

    if (deletedSectionCommandIds.length > 0) {
      for (const deletedSectionCommandId of deletedSectionCommandIds) {
        yield retry(3, 1000, deleteSectionsOfPageDraft, { commandId: deletedSectionCommandId });
        yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedSectionCommandId }));
      }
    }

    if (deletedMegaMenuCommandIds.length > 0) {
      for (const deletedMegaMenuCommandId of deletedMegaMenuCommandIds) {
        yield retry(3, 1000, deleteMegaMenusOfPageDraft, { commandId: deletedMegaMenuCommandId });
        yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedMegaMenuCommandId }));
      }
    }

    /** Xử lý lưu section & megamenu */
    // TODO: Utils transform thay vì ép kiểu
    let sectionResponse: PageSection[] = [];
    let megaMenusResponse: PageSection[] = [];

    for (const section of mainSections) {
      const response: SaveSectionOfPageDraft = yield call(
        handleSaveSectionOfPageDraft,
        section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        'Update',
      );
      sectionResponse = sectionResponse.concat(response.section);
      megaMenusResponse = megaMenusResponse.concat(response.megaMenus).flat();
    }

    yield put(updateMainSectionsToPages({ sections: sectionResponse, pageId: page.commandId }));

    /** Xử lý lưu page */
    const response: Awaited<ReturnType<typeof updatePageDraft>> = yield retry(3, 1000, updatePageDraft, {
      page: {
        ...page,
        image: { ...page.image, src: url },
        sections: sectionResponse.length > 0 ? sectionResponse : [],
        enable: true,
      },
      pageSettings: settings,
    });

    const { info } = response;

    if (info.pageSettings) {
      yield put(setGeneralSettingsPage({ settings: info.pageSettings.generalSettings }));
      yield put(setVendors({ vendors: info.pageSettings.vendors }));
      yield put(setGlobalJs({ js: info.pageSettings.globalJs }));
      yield put(setGlobalScss({ scss: info.pageSettings.globalScss }));
    }
    yield put(addMegaMenusToPage(megaMenusResponse));

    yield put(
      syncToShopify.request({
        result: outputBuilder,
        isOverrideIndividualPages,
        onSyncFulfill: () => {
          onFulfill?.({
            ...page,
            ...((response.info as unknown) as DevPage),
            commandId: response.info.commandId,
          });
        },
      }),
    );

    yield put(savePageForDev.success(undefined));
  } catch (error) {
    syncPageNotification.done();
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(savePageForDev.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
  }
}

function* handleSavePageDraft(params: ReturnType<typeof savePageForDev.request>) {
  const { method } = params.payload;
  syncPageNotification.next({
    title: 'Step 2',
    description: 'Saving page',
  });
  if (method === 'create') {
    yield call(handleCreatePageDraft, params);
  }
  if (method === 'update') {
    yield call(handleUpdatePageDraft, params);
  }
}

let savePageTask: Task | undefined;

export function* watchSavePageDraft() {
  while (true) {
    const requestAction: ReturnType<typeof savePageForDev.request> = yield take(getActionType(savePageForDev.request));
    if (!!savePageTask) {
      yield cancel(savePageTask);
    }
    savePageTask = yield fork(handleSavePageDraft, requestAction);
  }
}

export function* watchCancelSavePageDraft() {
  while (true) {
    const cancelAction: ReturnType<typeof savePageForDev.cancel> = yield take(getActionType(savePageForDev.cancel));
    if (cancelAction.type === '@BuilderPage/savePageForDev/cancel' && !!savePageTask) {
      yield cancel(savePageTask);
    }
  }
}
