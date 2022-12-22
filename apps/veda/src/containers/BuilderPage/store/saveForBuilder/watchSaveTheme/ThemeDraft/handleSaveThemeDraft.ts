import { MODAL_REPORT_SAVE_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { all, call, put, retry, select } from 'redux-saga/effects';
import { adapterGetAddons } from 'services/AddonService/Adapters/adapterGetAddons';
import { createAddonOfThemeDraft } from 'services/ThemeService/Logic/createAddonOfThemeDraft';
import { createHeaderOrFooterOfThemeDraft } from 'services/ThemeService/Logic/createHeaderOrFooterOfThemeDraft';
import { createMegamenuOfThemeDraft } from 'services/ThemeService/Logic/createMegamenuOfThemeDraft';
import { createSectionOfPageInThemeDraft } from 'services/ThemeService/Logic/createSectionOfPageInThemeDraft';
import { deleteAddonOfThemeDraft } from 'services/ThemeService/Logic/deleteAddonOfThemeDraft';
import { deleteMegaMenuOfThemeDraft } from 'services/ThemeService/Logic/deleteMegaMenuOfThemeDraft';
import { deleteSectionOfThemeDraft } from 'services/ThemeService/Logic/deleteSectionOfThemeDraft';
import { updateAddonOfThemeDraft } from 'services/ThemeService/Logic/updateAddonOfThemeDraft';
import { updateHeaderOrFooterOfThemeDraft } from 'services/ThemeService/Logic/updateHeaderOrFooterOfThemeDraft';
import { updateMegamenuOfThemeDraft } from 'services/ThemeService/Logic/updateMegamenuOfThemeDraft';
import { updatePageOfThemeDraft } from 'services/ThemeService/Logic/updatePageOfThemeDraft';
import { updateSectionOfPageInThemeDraft } from 'services/ThemeService/Logic/updateSectionofPageInThemeDraft';
import { updateThemeDraft } from 'services/ThemeService/Logic/updateThemeDraft';
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

function* handleSaveSectionOfPageInThemeDraft(section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(section, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfThemeDraft | typeof updateMegamenuOfThemeDraft>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId) {
        return retry(3, 1000, updateMegamenuOfThemeDraft, { megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client });
      } else {
        return retry(3, 1000, createMegamenuOfThemeDraft, { megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client });
      }
    }),
  );
  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);
  yield put(updateMegaMenusToPage({ megaMenus: megamenuResponses }));

  /** Xử lý lưu section */
  if (section.commandId) {
    const response: Awaited<ReturnType<typeof updateSectionOfPageInThemeDraft>> = yield retry(3, 1000, updateSectionOfPageInThemeDraft, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof createSectionOfPageInThemeDraft>> = yield retry(3, 1000, createSectionOfPageInThemeDraft, {
      section: { ...section, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  }
}
function* handleSaveHeaderOrFooterOfThemeDraft(headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const megaMenuIds = deepFind(headerOrFooter, 'megaMenuId');
  const megaMenuSections = pageSections.filter(item => megaMenuIds.includes(item.id));

  /** Xử lý lưu mega menu */
  const megamenuResponses: Array<Awaited<ReturnType<typeof createMegamenuOfThemeDraft | typeof updateMegamenuOfThemeDraft>>> = yield all(
    megaMenuSections.map(megamenuSection => {
      if (megamenuSection.commandId) {
        return retry(3, 1000, updateMegamenuOfThemeDraft, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      } else {
        return retry(3, 1000, createMegamenuOfThemeDraft, {
          megamenu: megamenuSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
        });
      }
    }),
  );
  const megaMenuCommandIds = megamenuResponses.map(megamenuResponse => megamenuResponse.commandId).filter(Boolean);
  yield put(updateMegaMenusToPage({ megaMenus: megamenuResponses }));

  /** Xử lý lưu headerOrFooter */
  if (headerOrFooter.commandId) {
    const response: Awaited<ReturnType<typeof updateHeaderOrFooterOfThemeDraft>> = yield retry(3, 1000, updateHeaderOrFooterOfThemeDraft, {
      headerOrFooter: { ...headerOrFooter, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  } else {
    const response: Awaited<ReturnType<typeof createHeaderOrFooterOfThemeDraft>> = yield retry(3, 1000, createHeaderOrFooterOfThemeDraft, {
      headerOrFooter: { ...headerOrFooter, megaMenuCommandIds } as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
    });
    return response;
  }
}
function* handleSavePageInThemeDraft(pageResult: Result['pages'][string], outputBuilder: Result) {
  const { page, pageSettings } = pageResult.data;
  const mainSections = page.sections.filter(section => isMain(section.type) || isDefault(section.type));
  // TODO: Utils transform thay vì ép kiểu
  const page_ = page as PageOfThemeService;

  /** Save sections & megamenu */
  // TODO: Utils transform thay vì ép kiểu
  const sectionResponses: Array<Awaited<ReturnType<typeof updateSectionOfPageInThemeDraft | typeof createSectionOfPageInThemeDraft>>> = yield all(
    mainSections.map(section => call(handleSaveSectionOfPageInThemeDraft, section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)),
  );

  yield put(updateMainSectionsToPages({ sections: sectionResponses, pageId: page_.commandId }));

  /** Save pages */
  const response: Awaited<ReturnType<typeof updatePageOfThemeDraft>> = yield retry(3, 1000, updatePageOfThemeDraft, {
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

function* deleteSectionAddonMegaMenuOfThemeDraft() {
  const { deletedMegaMenuCommandIds, deletedSectionCommandIds, deletedAddonCommandIds }: ReturnType<typeof pagesSelector> = yield select(
    pagesSelector,
  );

  if (deletedSectionCommandIds.length > 0) {
    for (const deletedSectionCommandId of deletedSectionCommandIds) {
      yield retry(3, 1000, deleteSectionOfThemeDraft, { commandId: deletedSectionCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedSectionCommandId }));
    }
  }
  if (deletedMegaMenuCommandIds.length > 0) {
    for (const deletedMegaMenuCommandId of deletedMegaMenuCommandIds) {
      yield retry(3, 1000, deleteMegaMenuOfThemeDraft, { commandId: deletedMegaMenuCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedMegaMenuCommandId }));
    }
  }

  if (deletedAddonCommandIds.length > 0) {
    for (const deletedAddonCommandId of deletedAddonCommandIds) {
      yield retry(3, 1000, deleteAddonOfThemeDraft, { commandId: deletedAddonCommandId });
      yield put(removeDeletedSectionAddonMegaMenuCommandIds({ deletedAddonCommandId }));
    }
  }
}

export function* handleSaveThemeDraft({ payload }: ReturnType<typeof saveTheme.request>) {
  const { outputBuilder, addons, footers, headers, globalJs, globalScss, commandId, featuredImage, themeSettings, vendors, onFulfill } = payload;
  try {
    yield call(deleteSectionAddonMegaMenuOfThemeDraft);

    const pagesResult = Object.values(outputBuilder.pages);

    yield all(
      pagesResult.map(pageResult => {
        return call(handleSavePageInThemeDraft, pageResult, outputBuilder);
      }),
    );
    /** Save addons */
    // TODO: Utils transform thay vì ép kiểu
    const addonResponses: Array<Awaited<ReturnType<typeof createAddonOfThemeDraft | typeof updateAddonOfThemeDraft>>> = yield all(
      addons.map(addon => {
        if (addon.commandId) {
          return retry(3, 1000, updateAddonOfThemeDraft, {
            addon: { ...addon, category: undefined } as AddonOfTheme_Atom_N_Client,
          });
        }
        return retry(3, 1000, createAddonOfThemeDraft, {
          addon: { ...addon, category: undefined } as AddonOfTheme_Atom_N_Client,
        });
      }),
    );
    const addonCommandIds = addonResponses.map(addonResponse => addonResponse.commandId);
    yield put(updateThemeAddonsToPage.success({ addons: adapterGetAddons(addonResponses) }));
    yield put(updateAddonsToPage({ addons: adapterGetAddons(addonResponses).map(item => item.body) as PageSection[] }));

    /** Save header */
    // TODO: Utils transform thay vì ép kiểu
    const headerResponses: Array<Awaited<ReturnType<typeof createHeaderOrFooterOfThemeDraft | typeof updateHeaderOrFooterOfThemeDraft>>> = yield all(
      headers.map(header => call(handleSaveHeaderOrFooterOfThemeDraft, header as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)),
    );
    const headerCommandIds = headerResponses.map(headerResponse => headerResponse.commandId);
    yield put(setThemeHeaders({ headers: headerResponses }));
    yield put(updateHeadersToPage({ headers: headerResponses }));

    /** Save footer */
    // TODO: Utils transform thay vì ép kiểu
    const footerResponses: Array<Awaited<ReturnType<typeof createHeaderOrFooterOfThemeDraft | typeof updateHeaderOrFooterOfThemeDraft>>> = yield all(
      footers.map(footer => call(handleSaveHeaderOrFooterOfThemeDraft, footer as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)),
    );
    const footerCommandIds = footerResponses.map(footerResponse => footerResponse.commandId);
    yield put(setThemeFooters({ footers: footerResponses }));
    yield put(updateFootersToPage({ footers: footerResponses }));

    /** Save theme */
    yield retry(3, 1000, updateThemeDraft, {
      theme: {
        commandId,
        footerSectionCommandIds: footerCommandIds,
        headerSectionCommandIds: headerCommandIds,
        addonCommandIds: addonCommandIds,
        globalJs,
        globalScss,
        themeSettings,
        vendors: vendors.data,
        featuredImage,
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
