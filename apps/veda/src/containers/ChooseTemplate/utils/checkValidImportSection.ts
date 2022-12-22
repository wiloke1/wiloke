import { ThemeAddon } from 'types/Addons';
import { FileImportSection, FileImportAddons } from 'types/FileImportExport';
import { PageType } from 'types/Page';
import { ProductSection } from 'types/Sections';

type FileImport = FileImportAddons | FileImportSection;

type Check = 'valid' | 'invalid';

type CheckType = 'section' | 'addon';

/**
 * Nếu type của section không chứa type của page thì không cho import
 * Nếu section không có pageTypes thì được import ở mọi page
 * Ví dụ:
 *  page: {
 *    type: "collection"
 *  };
 *  section: {
 *    pageTypes: ['home', 'article']
 *  }
 *  => false
 */
export const checkValidImportSectionType = (pageType: PageType, section: ProductSection): Check => {
  if (section.pageTypes === undefined) {
    return 'valid';
  } else if (section.pageTypes.includes(pageType)) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

/**
 * Nếu file import vào không có data chứa setting schema thì không phải là data section
 */
export const checkIsSectionFile = (section: ProductSection): Check => {
  if (section.data === undefined) {
    return 'invalid';
  } else {
    return 'valid';
  }
};

export const checkIsAddonsFile = (addons: ThemeAddon): Check => {
  if (addons.body === undefined) {
    return 'invalid';
  } else {
    return 'valid';
  }
};

export const checkValidFileImport = (fileContentFromUpload: FileImport): Check => {
  if ((fileContentFromUpload as FileImportAddons).body !== undefined || (fileContentFromUpload as FileImportSection).data !== undefined) {
    return 'valid';
  } else {
    return 'invalid';
  }
};

export const checkIsSectionOrAddons = (fileContentFromUpload: FileImport): CheckType => {
  if ((fileContentFromUpload as FileImportAddons).body !== undefined) {
    return 'addon';
  } else {
    return 'section';
  }
};
