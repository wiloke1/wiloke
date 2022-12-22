import { Option } from 'components/SelectAntd';
import { createSelector } from 'reselect';
import { PageSection } from 'types/Sections';
import { isFooter, isHeader, isSectionAddonsOrMegamenu } from 'utils/functions/checkSectionType';
import getPageInfo from 'utils/functions/getInfo';
import { defaultGeneralSettings } from './global/generalSettings/slice';
import { defaultVendors } from './reducers/reducerVendors';

export const authSelector = (state: AppState) => state.global.auth;
export const pagesSelector = (state: AppState) => state.global.pages;
export const pagesDataSelector = (state: AppState) => state.global.pages.data;
export const pageDataSelector = (state: AppState) => state.global.pages.data[getPageInfo('id')];
export const pageSectionsSelector = (state: AppState) => state.global.pages.data[getPageInfo('id')]?.sections ?? ([] as PageSection[]);

export const mainSectionsSelector = createSelector(pageSectionsSelector, state => {
  return state.filter(section => !isSectionAddonsOrMegamenu(section.type) && !isHeader(section.type) && !isFooter(section.type));
});

export const footerSectionsSelector = createSelector(pageSectionsSelector, state => {
  return state.filter(section => isFooter(section.type));
});

export const headerSectionsSelector = createSelector(pageSectionsSelector, state => {
  return state.filter(section => isHeader(section.type));
});

export const sectionActiveSelector = createSelector(
  (state: AppState) => state.global,
  state => {
    const { sectionIdActive, pages } = state;
    const sections = pages.data[getPageInfo('id')]?.sections ?? ([] as PageSection[]);
    return sections.find(section => section.id === sectionIdActive);
  },
);

export const pageSectionsDraftSelector = (state: AppState) => state.global.pages.sectionsDraft;
export const sectionSortableInfoSelector = (state: AppState) => state.global.pages.sectionSortableInfo;
export const sectionIdActiveSelector = (state: AppState) => state.global.sectionIdActive;
export const sectionEdittingIdSelector = (state: AppState) => state.global.sectionEdittingId;
export const sectionIdCodeVisibleSelector = (state: AppState) => state.global.sectionIdCodeVisible;
export const sectionArrFieldIndexActiveSelector = (state: AppState) => state.global.sectionArrFieldIndexActive;
export const isDraggingSelector = (state: AppState) => state.global.isDragging;
export const componentNameSelector = (state: AppState) => state.global.componentName;
export const modalSettingsOkSelector = (state: AppState) => state.global.modalSettingsOk;
export const themeSettingsSelector = (state: AppState) => state.global.themeSettings;
export const pageSettingsSelector = (state: AppState) => state.global.pageSettings;
export const cssVariablesSelector = (state: AppState) => state.global.themeSettings.cssVariables;

export const colorsLightSelector = createSelector(
  (state: AppState) => state.global.themeSettings.cssVariables,
  state => {
    const { colors } = state;
    return colors.map(item => item.light);
  },
);

export const colorsDarkSelector = createSelector(
  (state: AppState) => state.global.themeSettings.cssVariables,
  state => {
    const { colors } = state;
    return colors.map(item => item.dark);
  },
);

export const layoutSettingsSelector = (state: AppState) => state.global.themeSettings.layoutSettings;
export const themeGeneralSettingsSelector = (state: AppState) => state.global.themeSettings.generalSettings;
export const allGeneralSettingsSelector = (state: AppState) => state.global.pageSettings.generalSettings;
export const generalSettingsSelector = (state: AppState) => state.global.pageSettings.generalSettings[getPageInfo('id')] ?? defaultGeneralSettings;
export const allVendorsSelector = (state: AppState) => state.global.pageSettings.vendors;
export const vendorsSelector = (state: AppState) => state.global.pageSettings.vendors[getPageInfo('id')] ?? defaultVendors;
export const allGlobalScssSelector = (state: AppState) => state.global.pageSettings.globalScss;
export const globalScssSelector = (state: AppState) => state.global.pageSettings.globalScss[getPageInfo('id')] ?? '';
export const allGlobalJsSelector = (state: AppState) => state.global.pageSettings.globalJs;
export const globalJsSelector = (state: AppState) => state.global.pageSettings.globalJs[getPageInfo('id')] ?? '';
export const clipboardSelector = (state: AppState) => state.global.pages.clipboard;
export const iframeHoverSelector = (state: AppState) => state.global.iframeHover;
export const reloadPageSelector = (state: AppState) => state.global.reloadPage;
export const importFileDraftSelector = (state: AppState) => state.global.importFileDraft;
export const allowReorderingFieldsSelector = (state: AppState) => state.global.allowReorderingFields;
export const preloaderTestingSelector = (state: AppState) => state.global.preloaderTesting;
export const themeAddonsSelector = (state: AppState) => state.global.themeAddons;
export const themeHeaderFooterSelector = (state: AppState) => state.global.themeHeaderFooter;

export const sidebarTabActiveSelector = (state: AppState) => state.global.sidebarTabActive;

export const chooseTemplateVisibleSelector = (state: AppState) => state.chooseTemplate.chooseTemplateVisible;

export const sectionsSelector = {
  savedSections: (state: AppState) => state.chooseTemplate.savedSections,
  categories: (state: AppState) => state.chooseTemplate.category,
  transformCategories: createSelector(
    (state: AppState) => state.chooseTemplate.category,
    state => {
      const { categories } = state;
      return categories.map<Option>(item => {
        return {
          label: item.title,
          value: item.slug,
          commandId: item.commandId,
        };
      });
    },
  ),

  userSections: (state: AppState) => state.chooseTemplate.templateSections,
  draftSections: (state: AppState) => state.chooseTemplate.draftSections,
  adminSections: (state: AppState) => state.chooseTemplate.adminSections,
};

export const megaMenuSelector = {
  draftMegaMenu: (state: AppState) => state.chooseTemplate.draftMegaMenu,
  adminMegaMenu: (state: AppState) => state.chooseTemplate.adminMegaMenu,
  userMegaMenu: (state: AppState) => state.global.megaMenu,
};

export const responsiveSelector = (state: AppState) => state.builderPage.responsive;
export const fullscreenSelector = (state: AppState) => state.builderPage.fullScreen;
export const liquidVariablesSelector = (state: AppState) => state.liquidVariables;
export const saveForBuilderSelector = (state: AppState) => state.builderPage.saveForBuilder;

export const iframeSelectors = {
  addonsPositionStart: (state: AppState) => state.iframe.addonPositionStart,
  sectionToolbar: (state: AppState) => state.iframe.sectionToolbar,
  sectionsRenderStatus: (state: AppState) => state.iframe.sectionsRenderStatus,
};

export const documentColorsSelector = createSelector(cssVariablesSelector, cssVariables => {
  return Array.from(
    new Set(
      cssVariables.colors.flatMap(item => {
        return [item.dark, item.light];
      }),
    ),
  );
});

export const shopifySelector = {
  collections: (state: AppState) => state.global.shopify.collections,
  pages: (state: AppState) => state.global.shopify.pages,
  products: (state: AppState) => state.global.shopify.products,
  articles: (state: AppState) => state.global.shopify.articles,
  blogs: (state: AppState) => state.global.shopify.blogs,

  multiShopifyPicker: (state: AppState) => state.global.shopify.multiProductPicker,
  metafields: (state: AppState) => state.global.shopify.metafields,
};

export const themeBuilderSelector = {
  templates: (state: AppState) => state.adminDashboard.themeBuilder.templates,
};
export const pageBuilderSelector = {
  templates: (state: AppState) => state.adminDashboard.pageBuilder.templates,
  blankPage: (state: AppState) => state.adminDashboard.pageBuilder.blankPage,
};

export const versionSelector = (state: AppState) => state.global.versions;

export const addonSelector = {
  userAddons: (state: AppState) => state.chooseTemplate.templateAddons,
  userAddonsCategory: (state: AppState) => state.chooseTemplate.userAddonsCategory,

  draftAddons: (state: AppState) => state.chooseTemplate.draftAddons,
  draftAddonsCategory: (state: AppState) => state.chooseTemplate.draftAddonCategory,

  adminAddons: (state: AppState) => state.chooseTemplate.adminAddons,
  adminAddonsCategory: (state: AppState) => state.chooseTemplate.adminAddonsCategory,
};

export const generalStatusSelector = {
  theme: (state: AppState) => state.global.generalSettingStatus.getThemeSettingsStatus,
  page: (state: AppState) => state.global.generalSettingStatus.getPageSettingsStatus,
};

export const globalMountSelector = (state: AppState) => state.globalMount;

export const presetStyleSelector = (state: AppState) => state.presetStyles;

export const productPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.productPage;
export const collectionPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.collectionPage;
export const articlePageSelector = (state: AppState) => state.adminDashboard.pageBuilder.articlePage;
export const homePageSelector = (state: AppState) => state.adminDashboard.pageBuilder.homePage;
export const cartPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.cartPage;
export const searchPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.searchPage;
export const passwordPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.passwordPage;
export const notFoundPageSelector = (state: AppState) => state.adminDashboard.pageBuilder.notFoundPage;
export const customerLoginSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerLogin;
export const customerResetPasswordSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerResetPassword;
export const customerActivateAccountSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerActivateAccount;
export const customerRegisterSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerRegister;
export const customerAccountSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerAccount;
export const customerOrderSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerOrder;
export const customerAddressesSelector = (state: AppState) => state.adminDashboard.pageBuilder.customerAddresses;
export const giftCardSelector = (state: AppState) => state.adminDashboard.pageBuilder.giftCard;
export const collectionListingSelector = (state: AppState) => state.adminDashboard.pageBuilder.collectionListing;

export const socketOfSyncShopifySelector = (state: AppState) => state.socket.syncShopify;
export const socketOfImportThemeAtomClientServiceSelector = (state: AppState) => state.socket.importThemeAtomToClientService;

export const defaultPickerRelateShopifySelector = (state: AppState) => state.defaultPickerFieldRelateShopify;

export const authorsSelector = (state: AppState) => state.authors;

export const renewDataBuilderSelector = (state: AppState) => state.renewDataBuilder;
