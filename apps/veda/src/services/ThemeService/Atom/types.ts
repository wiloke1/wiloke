import { ThemeTranslations } from 'types/Result';
import { AdminTheme, DevTheme } from 'types/Theme';

export interface BE_PageInThemeAtom {
  commandId: string;
  parentCommandId?: string;
  label: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  sectionCommandIds: string[];
  type: string;
  pageSettings?: {
    generalSettings: {
      headerFooterEnabled: boolean;
      label: string;
      metaDescription: string;
      metaTitle: string;
      handle: string;
      socialShareImage: string;
      lazyload: boolean;
    };
    globalJs: string;
    globalScss: string;
    vendors: Array<{
      css: string;
      id: string;
      js: string;
    }>;
    cssVariables?: {
      colors: Array<{
        id: string;
        name: string;
        light: string;
        dark: string;
      }>;
      fonts: Array<{
        id: string;
        name: string;
        value: string;
      }>;
    };
    layoutSettings?: {
      containerWidth: number;
      containerGap: number;
      columnGapX: number;
      columnGapY: number;
    };
  };
  // @deprecated
  status?: string;
  // @deprecated
  comment?: string;
}

export interface BE_ThemeAtom {
  commandId: AdminTheme['commandId'];
  parentCommandId: AdminTheme['commandId'];
  label: AdminTheme['label'];
  userId: AdminTheme['userId'];
  featuredImage: AdminTheme['featuredImage'];
  pageCommandIds: AdminTheme['pageCommandIds'];
  themeSettings: Omit<AdminTheme['themeSettings'], 'globalTranslations'> & {
    globalTranslations: ThemeTranslations | { translation: { languageActive: keyof ThemeTranslations; translation: ThemeTranslations } };
  };
  vendors: Array<Omit<AdminTheme['vendors'][number], 'id'>>;
  globalJs: AdminTheme['globalJs'];
  globalScss: AdminTheme['globalScss'];
  addonCommandIds: AdminTheme['addonCommandIds'];
  headerSectionCommandIds: AdminTheme['headerSectionCommandIds'];
  footerSectionCommandIds: AdminTheme['footerSectionCommandIds'];
  createdDateTimestamp: AdminTheme['createdDateTimestamp'];
  modifiedDateTimestamp: AdminTheme['modifiedDateTimestamp'];
  approvedBy: AdminTheme['approvedBy'];
}

export interface BE_ThemeDraft {
  commandId: DevTheme['commandId'];
  label: DevTheme['label'];
  userId: DevTheme['userId'];
  featuredImage: DevTheme['featuredImage'];
  pageCommandIds: DevTheme['pageCommandIds'];
  themeSettings: Omit<DevTheme['themeSettings'], 'globalTranslations'> & {
    globalTranslations: ThemeTranslations | { translation: { languageActive: keyof ThemeTranslations; translation: ThemeTranslations } };
  };
  vendors: Array<Omit<DevTheme['vendors'][number], 'id'>>;
  globalJs: DevTheme['globalJs'];
  globalScss: DevTheme['globalScss'];
  addonCommandIds: DevTheme['addonCommandIds'];
  headerSectionCommandIds: DevTheme['headerSectionCommandIds'];
  footerSectionCommandIds: DevTheme['footerSectionCommandIds'];
  createdDateTimestamp: DevTheme['createdDateTimestamp'];
  modifiedDateTimestamp: DevTheme['modifiedDateTimestamp'];
  parentCommandId: DevTheme['parentCommandId'];
  status: DevTheme['status'];
}
