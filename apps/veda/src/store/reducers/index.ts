import { combineReducers } from 'redux';
import { sliceAllowReorderingFields } from 'store/global/allowReorderingFields/slice';
import { sliceAuth } from 'store/global/auth/slice';
import { sliceComponentName } from 'store/global/componentName/slice';
import { sliceCssVariables } from 'store/global/cssVariables/slice';
import { sliceGeneralSettings } from 'store/global/generalSettings/slice';
import { sliceGlobalJs } from 'store/global/globalJs/slice';
import { sliceGlobalScss } from 'store/global/globalScss/slice';
import { sliceIframeHover } from 'store/global/iframeHover/slice';
import { sliceImportFileDraft } from 'store/global/importFileDraft/slice';
import { sliceIsDragging } from 'store/global/isDragging/slice';
import { slicePreloaderTesting } from 'store/global/preloaderTesting/slice';
import { reducerSectionEdittingId } from 'store/global/sectionEdittingId/reducer';
import { sliceStatusGeneralSetting } from 'store/global/statusGeneralSettings';
import { sliceThemeAddons } from 'store/global/themeAddons';
import { sliceThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { sliceThemeHeaderFooter } from 'store/global/themeHeaderFooter/slice';
import { sliceGlobalThemeScss } from 'store/global/globalThemeScss/slice';
import { sliceGlobalThemeJs } from 'store/global/globalThemeJs/slice';
import { sliceThemeVendors } from 'store/global/themeVendors/slice';
import { sliceAppSettings } from 'store/global/appSettings/slice';
import { sliceMegaMenu } from 'containers/BuilderPage/components/DraggableMenu';
import { sliceGlobalThemeTranslation } from 'store/global/globalTranslation/slice';
import { sliceRedirected } from 'store/global/redirected/slice';
import { sliceSectionIdHover } from 'store/global/sectionIdHover/slice';
import { sliceMegaMenusOfHeaderFooter } from 'store/global/megaMenusOfHeaderFooter';
import { sliceDataBindingFieldNames } from 'store/global/dataBindingFieldNames/slice';
import { sliceIsIframeScrolling } from 'store/global/isIframeScrolling/sliceIsIframeScrolling';
import { sliceLiquidSnippets } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { sliceSectionIdCodeVisible } from '../global/sectionIdCodeVisible/slice';
import { reducerLayoutSettings } from './reducerLayoutSettings';
import { reducerModalSettingsOk } from './reducerModalSettingsOk';
import { reducerPages } from './reducerPages';
import { reducerReloadPage } from './reducerReloadPage';
import { reducerSectionArrFieldIndexActive } from './reducerSectionArrFieldIndexActive';
import { reducerSectionIdActive } from './reducerSectionIdActive';
import { reducerSidebarTabActive } from './reducerSidebarTabActive';
import { reducerVendors } from './reducerVendors';
import { reducerShopify } from './shopify';
import { reducerVersion } from './versions/reducerVersion';
import { sliceOriginThemeSettings } from './sliceOriginThemeSettings';

const reducersGlobal = combineReducers({
  auth: sliceAuth.reducer,
  pages: reducerPages,
  sectionIdActive: reducerSectionIdActive,
  sectionEdittingId: reducerSectionEdittingId,
  sectionIdCodeVisible: sliceSectionIdCodeVisible.reducer,
  isDragging: sliceIsDragging.reducer,
  isIframeScrolling: sliceIsIframeScrolling.reducer,
  sectionArrFieldIndexActive: reducerSectionArrFieldIndexActive,
  componentName: sliceComponentName.reducer,
  iframeHover: sliceIframeHover.reducer,
  modalSettingsOk: reducerModalSettingsOk,
  allowReorderingFields: sliceAllowReorderingFields.reducer,
  preloaderTesting: slicePreloaderTesting.reducer,
  themeSettings: combineReducers({
    generalSettings: sliceThemeGeneralSettings.reducer,
    cssVariables: sliceCssVariables.reducer,
    layoutSettings: reducerLayoutSettings,
    globalScss: sliceGlobalThemeScss.reducer,
    globalJs: sliceGlobalThemeJs.reducer,
    globalTranslations: sliceGlobalThemeTranslation.reducer,
    vendors: sliceThemeVendors.reducer,
  }),
  pageSettings: combineReducers({
    generalSettings: sliceGeneralSettings.reducer,
    vendors: reducerVendors,
    globalScss: sliceGlobalScss.reducer,
    globalJs: sliceGlobalJs.reducer,
  }),
  reloadPage: reducerReloadPage,
  importFileDraft: sliceImportFileDraft.reducer,
  shopify: reducerShopify,
  themeAddons: sliceThemeAddons.reducer,
  themeHeaderFooter: sliceThemeHeaderFooter.reducer,
  megaMenusOfHeaderFooter: sliceMegaMenusOfHeaderFooter.reducer,
  versions: reducerVersion,
  sidebarTabActive: reducerSidebarTabActive,
  generalSettingStatus: sliceStatusGeneralSetting.reducer,
  appSettings: combineReducers({
    generalSettings: sliceAppSettings.reducer,
    liquidSnippets: sliceLiquidSnippets.reducer,
  }),
  megaMenu: sliceMegaMenu.reducer,
  redirected: sliceRedirected.reducer,
  sectionIdHover: sliceSectionIdHover.reducer,
  dataBindingFieldNames: sliceDataBindingFieldNames.reducer,
  originThemeSettings: sliceOriginThemeSettings.reducer,
});

export default reducersGlobal;
