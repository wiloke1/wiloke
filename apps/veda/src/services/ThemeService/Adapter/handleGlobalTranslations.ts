import { AdminTheme, ClientTheme, DevTheme } from 'types/Theme';
import { v4 } from 'uuid';
import { BE_ThemeAtom, BE_ThemeDraft } from '../Atom/types';
import { BE_ThemeClient } from '../VedaApplication/types';

export const handleGlobalTranslationsInThemeAtom = (theme: BE_ThemeAtom): AdminTheme => {
  const globalTranslations_ = theme.themeSettings.globalTranslations;

  return {
    ...theme,
    vendors: theme.vendors.map(vendor => ({ ...vendor, id: v4() })),
    themeSettings: {
      ...theme.themeSettings,
      globalTranslations: 'translation' in globalTranslations_ ? globalTranslations_.translation.translation : globalTranslations_,
    },
  };
};

export const handleGlobalTranslationsInThemeDraft = (theme: BE_ThemeDraft): DevTheme => {
  const globalTranslations_ = theme.themeSettings.globalTranslations;

  return {
    ...theme,
    commandId: theme.commandId,
    label: theme.label,
    userId: theme.userId,
    featuredImage: theme.featuredImage,
    pageCommandIds: theme.pageCommandIds,
    vendors: theme.vendors.map(vendor => ({ id: v4(), ...vendor })),
    globalJs: theme.globalJs,
    globalScss: theme.globalScss,
    addonCommandIds: theme.addonCommandIds,
    headerSectionCommandIds: theme.headerSectionCommandIds,
    footerSectionCommandIds: theme.footerSectionCommandIds,
    createdDateTimestamp: theme.createdDateTimestamp,
    modifiedDateTimestamp: theme.createdDateTimestamp,
    themeSettings: {
      ...theme.themeSettings,
      globalTranslations: 'translation' in globalTranslations_ ? globalTranslations_.translation.translation : globalTranslations_,
    },
  };
};

export const handleGlobalTranslationsInThemeClient = (theme: BE_ThemeClient): ClientTheme => {
  const globalTranslations_ = theme.themeSettings.globalTranslations ?? {};
  return {
    ...theme,
    vendors: theme.vendors.map(vendor => ({ ...vendor, id: v4() })),
    themeSettings: {
      ...theme.themeSettings,
      globalTranslations:
        'translation' in globalTranslations_
          ? 'translation' in globalTranslations_.translation
            ? globalTranslations_.translation.translation
            : globalTranslations_.translation
          : globalTranslations_,
    },
  };
};
