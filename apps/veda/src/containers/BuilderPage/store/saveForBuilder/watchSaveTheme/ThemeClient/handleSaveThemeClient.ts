import { MODAL_REPORT_SAVE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { all, call, put, retry, select } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { adapterGetAddons } from 'services/AddonService/Adapters/adapterGetAddons';
import { megaMenuService } from 'services/MegaMenuService';
import { sectionService } from 'services/SectionService';
import { createAddonOfThemeClient } from 'services/ThemeService/Logic/createAddonOfThemeClient';
import { createHeaderOrFooterOfThemeClient } from 'services/ThemeService/Logic/createHeaderOrFooterOfThemeClient';
import { createMegamenuOfThemeClient } from 'services/ThemeService/Logic/createMegamenuOfThemeClient';
import { createSectionOfPageInThemeClient } from 'services/ThemeService/Logic/createSectionOfPageInThemeClient';
import { updateAddonOfThemeClient } from 'services/ThemeService/Logic/updateAddonOfThemeClient';
import { updateHeaderOrFooterOfThemeClient } from 'services/ThemeService/Logic/updateHeaderOrFooterOfThemeClient';
import { updateMegamenuOfThemeClient } from 'services/ThemeService/Logic/updateMegamenuOfThemeClient';
import { updatePageOfThemeClient } from 'services/ThemeService/Logic/updatePageOfThemeClient';
import { updateSectionOfPageInThemeClient } from 'services/ThemeService/Logic/updateSectionofPageInThemeClient';
import { updateThemeClient } from 'services/ThemeService/Logic/updateThemeClient';
import {
  removeDeletedSectionAddonMegaMenuCommandIds,
  updateAddonsToPage,
  updateFootersToPage,
  updateHeadersToPage,
  updateMainSectionsToPages,
  updateMegaMenusToPage,
} from 'store/actions/actionPages';
import { setVendors } from 'store/actions/actionVendors';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { syncToShopify } from 'store/global/socket/actions';
import { updateThemeAddonsToPage } from 'store/global/themeAddons/actions';
import { setThemeFooters, setThemeHeaders } from 'store/global/themeHeaderFooter/slice';
import { setIsSavedTheme, setOriginThemeSettings } from 'store/reducers/sliceOriginThemeSettings';
import { pageSectionsSelector, pagesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { PageOfThemeService } from 'types/Page';
import { Result } from 'types/Result';
import { PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { isDefault, isMain } from 'utils/functions/checkSectionType';
import { deepFind } from 'utils/functions/deepFind';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { saveTheme } from '../../actions';

function* handleSaveSectionOfPageInThemeClient(section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(section, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfThemeClient | typeof updateMegamenuOfThemeClient>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId) {
        return retry(3, 1000, updateMegamenuOfThemeClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      } else {
        return retry(3, 1000, createMegamenuOfThemeClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      }
    }),
  );
  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);
  yield put(updateMegaMenusToPage({ megaMenus: megamenuResponses }));

  /** Xử lý lưu section */
  if (section.commandId) {
    const response: Awaited<ReturnType<typeof updateSectionOfPageInThemeClient>> = yield retry(3, 1000, updateSectionOfPageInThemeClient, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof createSectionOfPageInThemeClient>> = yield retry(3, 1000, createSectionOfPageInThemeClient, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  }
}

function* handleSaveHeaderOrFooterOfThemeClient(headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(headerOrFooter, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfThemeClient | typeof updateMegamenuOfThemeClient>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId) {
        return retry(3, 1000, updateMegamenuOfThemeClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      } else {
        return retry(3, 1000, createMegamenuOfThemeClient, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      }
    }),
  );
  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);
  yield put(updateMegaMenusToPage({ megaMenus: megamenuResponses }));

  /** Xử lý lưu section */
  if (headerOrFooter.commandId) {
    const response: Awaited<ReturnType<typeof updateHeaderOrFooterOfThemeClient>> = yield retry(3, 1000, updateHeaderOrFooterOfThemeClient, {
      headerOrFooter: { ...headerOrFooter, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof createHeaderOrFooterOfThemeClient>> = yield retry(3, 1000, createHeaderOrFooterOfThemeClient, {
      headerOrFooter: { ...headerOrFooter, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  }
}
function* handleSavePageInThemeClient(pageResult: Result['pages'][string], outputBuilder: Result) {
  const { page, pageSettings } = pageResult.data;
  const mainSections = page.sections.filter(section => isMain(section.type) || isDefault(section.type));
  // TODO: Utils transform thay vì ép kiểu
  const page_ = page as PageOfThemeService;

  /** Save sections & megamenu */
  // TODO: Utils transform thay vì ép kiểu
  const sectionResponses: Array<Awaited<ReturnType<typeof updateSectionOfPageInThemeClient | typeof createSectionOfPageInThemeClient>>> = yield all(
    mainSections.map(section => call(handleSaveSectionOfPageInThemeClient, section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)),
  );

  yield put(updateMainSectionsToPages({ sections: sectionResponses, pageId: page_.commandId }));

  /** Save pages */
  const response: Awaited<ReturnType<typeof updatePageOfThemeClient>> = yield retry(3, 1000, updatePageOfThemeClient, {
    page: {
      ...page_,
      sections: sectionResponses.length > 0 ? sectionResponses : [],
    },
    pageSettings,
  });

  const { info, message } = response;

  if (info.pageSettings) {
    yield put(setGeneralSettingsPage({ settings: info.pageSettings.generalSettings }));
    yield put(setVendors({ vendors: info.pageSettings.vendors }));
    yield put(setGlobalJs({ js: info.pageSettings.globalJs }));
    yield put(setGlobalScss({ scss: info.pageSettings.globalScss }));
  }

  // Dữ liệu trong reducer = dữ liệu BE trả về nên không cần set
  // yield put(
  //   setPage({
  //     ...page,
  //     commandId: info.commandId,
  //   }),
  // );
  notifyAxiosHandler.handleSuccess(message);

  outputBuilder = {
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

  return outputBuilder;
}

function* deleteSectionAddonMegaMenuOfThemeClient() {
  const { deletedMegaMenuCommandIds, deletedSectionCommandIds, deletedAddonCommandIds }: ReturnType<typeof pagesSelector> = yield select(
    pagesSelector,
  );

  if (deletedSectionCommandIds.length > 0) {
    for (const deletedSectionCommandId of deletedSectionCommandIds) {
      yield retry(3, 1000, sectionService.sections.deleteClientSections, { commandId: deletedSectionCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedSectionCommandId }));
    }
  }
  if (deletedMegaMenuCommandIds.length > 0) {
    for (const deletedMegaMenuCommandId of deletedMegaMenuCommandIds) {
      yield retry(3, 1000, megaMenuService.mega_menu.deleteClientMegaMenus, { commandId: deletedMegaMenuCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedMegaMenuCommandId }));
    }
  }

  if (deletedAddonCommandIds.length > 0) {
    for (const deletedAddonCommandId of deletedAddonCommandIds) {
      yield retry(3, 1000, addonService.addons.deleteClientAddons, { commandId: deletedAddonCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedAddonCommandId }));
    }
  }
}

export function* handleSaveThemeClient({ payload }: ReturnType<typeof saveTheme.request>) {
  const { outputBuilder, footers, headers, addons, globalJs, globalScss, commandId, themeSettings, vendors, onFulfill } = payload;
  try {
    yield call(deleteSectionAddonMegaMenuOfThemeClient);

    const pagesResult = Object.values(outputBuilder.pages);

    yield all(
      pagesResult.map(pageResult => {
        return call(handleSavePageInThemeClient, pageResult, outputBuilder);
      }),
    );
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
    yield put(updateAddonsToPage({ addons: adapterGetAddons(addonResponses).map(item => item.body) as PageSection[] }));

    /** Save header */
    // TODO: Utils transform thay vì ép kiểu
    const headerResponses: Array<Awaited<
      ReturnType<typeof createHeaderOrFooterOfThemeClient | typeof updateHeaderOrFooterOfThemeClient>
    >> = yield all(headers.map(header => call(handleSaveHeaderOrFooterOfThemeClient, header as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)));
    const headerCommandIds = headerResponses.map(headerResponse => headerResponse.commandId);
    yield put(setThemeHeaders({ headers: headerResponses }));
    yield put(updateHeadersToPage({ headers: headerResponses }));

    /** Save footer */
    // TODO: Utils transform thay vì ép kiểu
    const footerResponses: Array<Awaited<
      ReturnType<typeof createHeaderOrFooterOfThemeClient | typeof updateHeaderOrFooterOfThemeClient>
    >> = yield all(footers.map(footer => call(handleSaveHeaderOrFooterOfThemeClient, footer as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)));
    const footerCommandIds = footerResponses.map(footerResponse => footerResponse.commandId);
    yield put(setThemeFooters({ footers: footerResponses }));
    yield put(updateFootersToPage({ footers: footerResponses }));

    /** Save theme */
    yield retry(3, 1000, updateThemeClient, {
      theme: {
        commandId,
        footerSectionCommandIds: footerCommandIds,
        headerSectionCommandIds: headerCommandIds,
        addonCommandIds: addonCommandIds,
        globalJs,
        globalScss,
        themeSettings,
        vendors: vendors.data,
      },
    });

    yield put(
      syncToShopify.request({
        result: outputBuilder,
        isOverrideIndividualPages: true,
        onSyncFulfill: () => {},
      }),
    );
    notifyAxiosHandler.handleSuccess(`${i18n.t('general.update', { text: i18n.t('general.successfully') })}`);
    yield put(saveTheme.success(undefined));
    yield put(setIsSavedTheme(true));
    yield put(
      setOriginThemeSettings({
        cssVariables: themeSettings.cssVariables,
        generalSettings: themeSettings.generalSettings,
        globalTranslations: themeSettings.globalTranslations,
        layoutSettings: themeSettings.layoutSettings,
        vendors: vendors.data,
        globalJs,
        globalScss,
      }),
    );
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(saveTheme.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_SAVE_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.save_result'),
      description: error_.message,
    });
    throw error;
  } finally {
    onFulfill?.();
  }
}
