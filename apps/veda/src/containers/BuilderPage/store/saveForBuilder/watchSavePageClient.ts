import { themeDashboardSelector } from 'containers/Admin/ThemeBuilder/ThemeDashboard/slice/sliceThemeDashboard';
import { all, call, cancel, fork, put, retry, select, take } from 'redux-saga/effects';
import { adapterGetAddons } from 'services/AddonService/Adapters/adapterGetAddons';
import { deleteClientAddons } from 'services/AddonService/Logic/Addons';
import { mediaService } from 'services/MediaService';
import { megaMenuService } from 'services/MegaMenuService';
import { createMegamenuOfPageClient } from 'services/PageService/Logic/createMegamenuOfPageClient';
import { createPageClient } from 'services/PageService/Logic/createPageClient';
import { createSectionOfPageClient } from 'services/PageService/Logic/createSectionOfPageClient';
import { updateMegamenuOfPageClient } from 'services/PageService/Logic/updateMegamenuOfPageClient';
import { updatePageClient } from 'services/PageService/Logic/updatePageClient';
import { updateSectionOfPageClient } from 'services/PageService/Logic/updateSectionOfPageClient';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, removeDeletedSectionAddonMegaMenuCommandIds, setPage, updateMainSectionsToPages } from 'store/actions/actionPages';
import { createAddonOfThemeClient } from 'services/ThemeService/Logic/createAddonOfThemeClient';
import { updateAddonOfThemeClient } from 'services/ThemeService/Logic/updateAddonOfThemeClient';
import { updateThemeClient } from 'services/ThemeService/Logic/updateThemeClient';
import { setVendors } from 'store/actions/actionVendors';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { syncToShopify } from 'store/global/socket/actions';
import { updateThemeAddonsToPage } from 'store/global/themeAddons/actions';
import { pageSectionsSelector, pagesSelector, themeSettingsSelector } from 'store/selectors';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { PageOfThemeService, PageType } from 'types/Page';
import { PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { isDefault, isMain } from 'utils/functions/checkSectionType';
import { deepFind } from 'utils/functions/deepFind';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { removeDuplicateByKey } from 'utils/functions/removeDuplicate';
import { ThemeTranslations } from 'types/Result';
import { Consts } from 'utils/constants/constants';
import { syncPageNotification } from 'store/global/socket/watchSyncToShopify';
import { Task } from 'redux-saga';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { MODAL_REPORT_SAVE_ERROR } from 'containers/ModalReportAfterError/const';
import { i18n } from 'translation';
import { savePageForUser } from './actions';
interface SaveSectionOfPageClient {
  section: PageSection;
  megaMenus: PageSection[];
}

function* handleSaveSectionOfPageClient(section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, variant: 'Create' | 'Update') {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(section, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfPageClient | typeof updateMegamenuOfPageClient>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId && variant === 'Update') {
        return retry(3, 1000, updateMegamenuOfPageClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      } else {
        return retry(3, 1000, createMegamenuOfPageClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      }
    }),
  );

  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);
  /** Xử lý lưu section */
  if (section.commandId && variant === 'Update') {
    const response: Awaited<ReturnType<typeof updateSectionOfPageClient>> = yield retry(3, 1000, updateSectionOfPageClient, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return {
      section: response,
      megaMenus: megamenuResponses,
    };
  } else {
    const response: Awaited<ReturnType<typeof createSectionOfPageClient>> = yield retry(3, 1000, createSectionOfPageClient, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return {
      section: response,
      megaMenus: megamenuResponses,
    };
  }
}

function* handleCreatePageClient({ payload }: ReturnType<typeof savePageForUser.request>) {
  const { isDraft, page, settings, outputBuilder, onFulfill, isOverrideIndividualPages } = payload;
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
      const response: SaveSectionOfPageClient = yield call(
        handleSaveSectionOfPageClient,
        section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        'Create',
      );

      sectionResponse = sectionResponse.concat(response.section);
      megaMenusResponse = megaMenusResponse.concat(response.megaMenus).flat();
    }

    yield put(updateMainSectionsToPages({ sections: sectionResponse, pageId: page.commandId }));

    /** Xử lý lưu page */
    const response: Awaited<ReturnType<typeof createPageClient>> = yield retry(3, 1000, createPageClient, {
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
        type: info.type as PageType,
        sections: removeDuplicateByKey([...page.sections, ...sectionResponse], 'id'),
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

    if (isDraft) {
      onFulfill?.({
        ...page,
        ...((response.info as unknown) as PageOfThemeService),
        commandId: response.info.commandId,
      });
    } else {
      yield put(
        syncToShopify.request({
          result: outputBuilderAfterResponse,
          isOverrideIndividualPages,
          onSyncFulfill: () => {
            onFulfill?.({
              ...page,
              ...((response.info as unknown) as PageOfThemeService),
              commandId: response.info.commandId,
            });
          },
        }),
      );
    }

    yield put(savePageForUser.success(undefined));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(savePageForUser.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
  }
}

function* handleUpdatePageClient({ payload }: ReturnType<typeof savePageForUser.request>) {
  const { isDraft, page, settings, outputBuilder, onFulfill, isOverrideIndividualPages } = payload;
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
        yield retry(3, 1000, sectionService.sections.deleteClientSections, { commandId: deletedSectionCommandId });
        yield put(
          removeDeletedSectionAddonMegaMenuCommandIds({
            deletedSectionCommandId,
          }),
        );
      }
    }
    if (deletedMegaMenuCommandIds.length > 0) {
      for (const deletedMegaMenuCommandId of deletedMegaMenuCommandIds) {
        yield retry(3, 1000, megaMenuService.mega_menu.deleteClientMegaMenus, { commandId: deletedMegaMenuCommandId });
        yield put(
          removeDeletedSectionAddonMegaMenuCommandIds({
            deletedMegaMenuCommandId,
          }),
        );
      }
    }

    /** Xử lý lưu section & megamenu */
    // TODO: Utils transform thay vì ép kiểu
    let sectionResponse: PageSection[] = [];
    let megaMenusResponse: PageSection[] = [];

    for (const section of mainSections) {
      const response: SaveSectionOfPageClient = yield call(
        handleSaveSectionOfPageClient,
        section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        'Update',
      );

      sectionResponse = sectionResponse.concat(response.section);
      megaMenusResponse = megaMenusResponse.concat(response.megaMenus).flat();
    }

    yield put(updateMainSectionsToPages({ sections: sectionResponse, pageId: page.commandId }));

    /** Xử lý lưu page */
    const response: Awaited<ReturnType<typeof updatePageClient>> = yield retry(3, 1000, updatePageClient, {
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

    if (isDraft) {
      onFulfill?.({
        ...page,
        ...((response.info as unknown) as PageOfThemeService),
        commandId: response.info.commandId,
      });
    } else {
      yield put(
        syncToShopify.request({
          result: outputBuilder,
          isOverrideIndividualPages,
          onSyncFulfill: () => {
            onFulfill?.({
              ...page,
              ...((response.info as unknown) as PageOfThemeService),
              commandId: response.info.commandId,
            });
          },
        }),
      );
    }

    yield put(savePageForUser.success(undefined));
  } catch (error) {
    syncPageNotification.done();
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(savePageForUser.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
  }
}

function* handleSavePageClient(params: ReturnType<typeof savePageForUser.request>) {
  const { payload } = params;
  const { addons } = payload;
  yield put(updateThemeAddonsToPage.request({ addons }));

  try {
    syncPageNotification.next({
      title: 'Step 2',
      description: 'Saving page',
    });

    const themeSettings: ReturnType<typeof themeSettingsSelector> = yield select(themeSettingsSelector);
    const { themeActivate }: ReturnType<typeof themeDashboardSelector> = yield select(themeDashboardSelector);

    /** Delete addons */
    const { deletedAddonCommandIds }: ReturnType<typeof pagesSelector> = yield select(pagesSelector);
    if (deletedAddonCommandIds.length > 0) {
      for (const deletedAddonCommandId of deletedAddonCommandIds) {
        yield retry(3, 1000, deleteClientAddons, { commandId: deletedAddonCommandId });
        yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedAddonCommandId }));
      }
    }

    /** Save addons */
    // TODO: Utils transform thay vì ép kiểu
    const addonResponses: Array<Awaited<ReturnType<typeof createAddonOfThemeClient | typeof updateAddonOfThemeClient>>> = yield all(
      addons.map(addon => {
        if (addon.commandId) {
          return retry(3, 1000, updateAddonOfThemeClient, {
            addon: { ...addon, category: undefined } as AddonOfTheme_Atom_N_Client,
          });
        }
        return retry(3, 1000, createAddonOfThemeClient, {
          addon: { ...addon, category: undefined } as AddonOfTheme_Atom_N_Client,
        });
      }),
    );
    const addonCommandIds = addonResponses.map(addonResponse => addonResponse.commandId);
    yield put(updateThemeAddonsToPage.success({ addons: adapterGetAddons(addonResponses) }));

    /** Update theme */
    yield retry(3, 1000, updateThemeClient, {
      theme: {
        commandId: themeActivate.commandId,
        headerSectionCommandIds: themeActivate.headerSectionCommandIds,
        footerSectionCommandIds: themeActivate.footerSectionCommandIds,
        addonCommandIds: addonCommandIds,
        globalJs: themeSettings.globalJs,
        globalScss: themeSettings.globalScss,
        themeSettings: {
          ...themeSettings,
          globalTranslations: themeSettings.globalTranslations.translation as ThemeTranslations,
        },
        vendors: themeSettings.vendors,
      },
    });

    if (payload.data.commandId === Consts.BlankCommandId || payload.type === 'create') {
      yield call(handleCreatePageClient, params);
    } else {
      yield call(handleUpdatePageClient, params);
    }
  } catch (error) {
    syncPageNotification.done();
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(savePageForUser.failure(undefined));
    yield put(updateThemeAddonsToPage.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
  }
}

let savePageTask: Task | undefined;

export function* watchSavePageClient() {
  while (true) {
    const requestAction: ReturnType<typeof savePageForUser.request> = yield take(getActionType(savePageForUser.request));
    if (!!savePageTask) {
      yield cancel(savePageTask);
    }
    savePageTask = yield fork(handleSavePageClient, requestAction);
  }
}

export function* watchCancelSavePageClient() {
  while (true) {
    const cancelAction: ReturnType<typeof savePageForUser.cancel> = yield take(getActionType(savePageForUser.cancel));
    if (cancelAction.type === '@BuilderPage/savePageForUser/cancel' && !!savePageTask) {
      yield cancel(savePageTask);
    }
  }
}
