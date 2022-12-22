import { ThemeTranslations } from 'types/Result';
import { ProductTheme, ThemeGeneral } from 'types/Theme';

export type BE_ThemeProduct = ProductTheme;

export interface BE_ThemeClient {
  commandId: ThemeGeneral['commandId'];
  parentCommandId: ThemeGeneral['commandId'];
  label: ThemeGeneral['label'];
  userId: ThemeGeneral['userId'];
  featuredImage: ThemeGeneral['featuredImage'];
  pageCommandIds: ThemeGeneral['pageCommandIds'];
  themeSettings: Omit<ThemeGeneral['themeSettings'], 'globalTranslations'> & {
    globalTranslations:
      | ThemeTranslations
      | { translation: ThemeTranslations }
      | { translation: { languageActive: keyof ThemeTranslations; translation: ThemeTranslations } };
  };
  vendors: Array<Omit<ThemeGeneral['vendors'][number], 'id'>>;
  globalJs: ThemeGeneral['globalJs'];
  globalScss: ThemeGeneral['globalScss'];
  addonCommandIds: ThemeGeneral['addonCommandIds'];
  headerSectionCommandIds: ThemeGeneral['headerSectionCommandIds'];
  footerSectionCommandIds: ThemeGeneral['footerSectionCommandIds'];
  createdDateTimestamp: ThemeGeneral['createdDateTimestamp'];
  modifiedDateTimestamp: ThemeGeneral['modifiedDateTimestamp'];
  status: 'publish' | 'draft';
}
