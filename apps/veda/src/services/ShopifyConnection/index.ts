import { handleDeletePageInDashboard } from './handleDeletePageInDashboard';
import { handlePreviewInBuilderPage } from './handlePreviewInBuilderPage';
import { handleSaveInBuilderPage } from './handleSaveInBuilderPage';
import { handleUpdatePageSettingInDashboard } from './handleUpdatePageSettingInDashboard';
import { handleUpdateShopifyPagesInDashboard } from './handleUpdateShopifyPagesInDashboard';
import { handleUpdateStatusPage } from './handleUpdateStatusPage';
import { handleUpdateThemeSettingsInDashboard } from './handleUpdateThemeSettingsInDashboard';
import { changeThemeShopifyActivate } from './services/changeThemeShopifyActivate';
import { cleanAfterSync } from './services/cleanAfterSync';
import { deleteAddonInShopify, DeleteAddonInShopify_BEExpectParameters } from './services/deleteAddonInShopify';
import { deletePageInShopify, DeletePageInShopify_BEExpectParameters } from './services/deletePageInShopify';
import { getAdditionalDataRelateToShopify, GetAdditionalDataRelateToShopify_BEExpectResponse } from './services/getAdditionalDataRelateToShopify';
import { getThemesShopify } from './services/getThemesShopify';
import { migrateThemeShopify } from './services/migrateThemeShopify';
import { updateAddonsDisablePositionToShopify } from './services/updateAddonsDisablePositionToShopify';
import { updatePageStatus } from './services/updatePageStatus';
import { writeAddonToShopify, WriteAddonToShopify_BEExpectParameters } from './services/writeAddonToShopify';
import { writeAtomicCssToShopify, WriteAtomicCssToShopify_BEExpectParameters } from './services/writeAtomicCssToShopify';
import { writeGlobalOfPageToShopify, WriteGlobalOfPageToShopify_BEExpectParameters } from './services/writeGlobalOfPageToShopify';
import { writeGlobalOfThemeToShopify, WriteGlobalOfThemeToShopify_BEExpectParameters } from './services/writeGlobalOfThemeToShopify';
import { writeHeaderFooterToShopify, WriteHeaderFooterToShopify_BEExpectParameters } from './services/writeHeaderFooterToShopify';
import { writePageToShopify, WritePageToShopify_BEExpectParameters } from './services/writePageToShopify';
import { writeTranslation, WriteTranslation_BEExpectParameters } from './services/writeTranslationToShopify';
import { graphqlForMetafields } from './services/graphqlForMetafields';

const shopifyConnectionService = {
  writePageToShopify,
  deletePageInShopify,
  getAdditionalDataRelateToShopify,
  writeGlobalOfThemeToShopify,
  writeGlobalOfPageToShopify,
  writeHeaderFooterToShopify,
  writeAtomicCssToShopify,
  writeAddonToShopify,
  deleteAddonInShopify,
  syncTranslation: writeTranslation,
  getThemesShopify,
  migrateThemeShopify,
  cleanAfterSync,
  changeThemeShopifyActivate,
  updatePageStatus,
  updateAddonsDisablePositionToShopify,
  graphqlForMetafields
};

export {
  shopifyConnectionService,
  handleSaveInBuilderPage,
  handleUpdatePageSettingInDashboard,
  handleUpdateShopifyPagesInDashboard,
  handleUpdateStatusPage,
  handleUpdateThemeSettingsInDashboard,
  handleDeletePageInDashboard,
  writeTranslation as syncTranslation,
  handlePreviewInBuilderPage
};
// eslint-disable-next-line prettier/prettier
export type {
  WritePageToShopify_BEExpectParameters,
  DeletePageInShopify_BEExpectParameters,
  GetAdditionalDataRelateToShopify_BEExpectResponse,
  WriteGlobalOfThemeToShopify_BEExpectParameters,
  WriteGlobalOfPageToShopify_BEExpectParameters,
  WriteHeaderFooterToShopify_BEExpectParameters,
  WriteAtomicCssToShopify_BEExpectParameters,
  WriteAddonToShopify_BEExpectParameters,
  DeleteAddonInShopify_BEExpectParameters,
  WriteTranslation_BEExpectParameters as SyncTranslation_BEExpectParameters
};


