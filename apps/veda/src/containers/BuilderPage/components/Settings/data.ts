import { i18n } from 'translation';
import { FontAwesomeBrandsName, FontAwesomeName, FontAwesomeType } from 'wiloke-react-core';

export type SettingValue = 'theme' | 'page';
export type ThemeSettingValue = 'colors' | 'fonts' | 'layout' | 'general' | 'vendors' | 'scss' | 'js' | 'json';
export type PageSettingValue = 'general' | 'vendors' | 'scss' | 'js' | 'import';
export type DashboardPageSettingValue = 'general' | 'vendors' | 'scss' | 'js';

export interface Setting<T> {
  label: string;
  description?: string;
  value: T;
  icon?: FontAwesomeName | FontAwesomeBrandsName;
  iconType?: FontAwesomeType;
}

export const settings: Setting<SettingValue>[] = [
  {
    label: i18n.t('general.settings', { text: i18n.t('general.theme'), textTransform: 'capitalize' }),
    value: 'theme',
    icon: 'theater-masks',
  },
  {
    label: i18n.t('general.settings', { text: i18n.t('general.page'), textTransform: 'capitalize' }),
    value: 'page',
    icon: 'layer-plus',
  },
];

export const themeSettings: Setting<ThemeSettingValue>[] = [
  {
    icon: 'cog',
    label: i18n.t('builderPage.theme_settings.general.title'),
    description: i18n.t('builderPage.theme_settings.general.text'),
    value: 'general',
  },
  {
    icon: 'layer-group',
    label: i18n.t('builderPage.theme_settings.layout.title'),
    description: i18n.t('builderPage.theme_settings.layout.text'),
    value: 'layout',
  },
  {
    icon: 'palette',
    label: i18n.t('builderPage.theme_settings.colors.title'),
    description: i18n.t('builderPage.theme_settings.colors.text'),
    value: 'colors',
  },
  {
    icon: 'font',
    label: i18n.t('builderPage.theme_settings.fonts.title'),
    description: i18n.t('builderPage.theme_settings.fonts.text'),
    value: 'fonts',
  },
  {
    icon: 'css3',
    iconType: 'fab',
    label: i18n.t('builderPage.theme_settings.scss.title'),
    description: i18n.t('builderPage.theme_settings.scss.text'),
    value: 'scss',
  },
  {
    icon: 'js',
    iconType: 'fab',
    label: i18n.t('builderPage.theme_settings.js.title'),
    description: i18n.t('builderPage.theme_settings.js.text'),
    value: 'js',
  },
  {
    icon: 'language',
    iconType: 'far',
    label: 'Translation',
    description: 'Add global translation for theme',
    value: 'json',
  },
  {
    icon: 'boxes',
    label: i18n.t('builderPage.theme_settings.vendors.title'),
    description: i18n.t('builderPage.theme_settings.vendors.text'),
    value: 'vendors',
  },
];

export const pageSettings: Setting<PageSettingValue>[] = [
  {
    icon: 'cog',
    label: i18n.t('builderPage.page_settings.general.title'),
    description: i18n.t('builderPage.page_settings.general.text'),
    value: 'general',
  },
  {
    icon: 'boxes',
    label: i18n.t('builderPage.page_settings.vendors.title'),
    description: i18n.t('builderPage.page_settings.vendors.text'),
    value: 'vendors',
  },
  {
    icon: 'css3',
    iconType: 'fab',
    label: i18n.t('builderPage.page_settings.scss.title'),
    description: i18n.t('builderPage.page_settings.scss.text'),
    value: 'scss',
  },
  {
    icon: 'js',
    iconType: 'fab',
    label: i18n.t('builderPage.page_settings.js.title'),
    description: i18n.t('builderPage.page_settings.js.text'),
    value: 'js',
  },
  {
    icon: 'file-import',
    label: i18n.t('builderPage.page_settings.import.title'),
    description: i18n.t('builderPage.page_settings.import.text'),
    value: 'import',
  },
];

export const preloaders = [
  {
    id: '1',
    backgroundColor: '#43eba6',
    color: '#fff',
  },
  {
    id: '2',
    backgroundColor: '#a843eb',
    color: '#fff',
  },
  {
    id: '3',
    backgroundColor: '#f77772',
    color: '#fff',
  },
  {
    id: '4',
    backgroundColor: '#f7d872',
    color: '#fff',
  },
];

export const dashboardPageSettings: Setting<DashboardPageSettingValue>[] = [
  {
    icon: 'cog',
    label: i18n.t('builderPage.page_settings.general.title'),
    description: i18n.t('builderPage.page_settings.general.text'),
    value: 'general',
  },
  {
    icon: 'boxes',
    label: i18n.t('builderPage.page_settings.vendors.title'),
    description: i18n.t('builderPage.page_settings.vendors.text'),
    value: 'vendors',
  },
  {
    icon: 'css3',
    iconType: 'fab',
    label: i18n.t('builderPage.page_settings.scss.title'),
    description: i18n.t('builderPage.page_settings.scss.text'),
    value: 'scss',
  },
  {
    icon: 'js',
    iconType: 'fab',
    label: i18n.t('builderPage.page_settings.js.title'),
    description: i18n.t('builderPage.page_settings.js.text'),
    value: 'js',
  },
];
