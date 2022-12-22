import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaBreakpointsOfResponsiveField } from '../@consts/localKeyGenByVedaBreakpointsOfResponsiveField';
import { translationsOfBreakpoints } from '../@consts/translationsOfBreakpoints';
import { ISCHEMA_SettingResponsive } from '../@types/ISCHEMA_SettingResponsive';
import { ResponsiveValue } from '../@types/SettingResponsive';

interface RTVedaLabelsOfResponsiveFieldToShopifyFieldLabel {
  newLabelOfBreakpoint: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaBreakpointsOfResponsiveField}_${v4()}_`;

export const vedaLabelsOfResponsiveFieldToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingResponsive,
  breakpoint: keyof ResponsiveValue,
): RTVedaLabelsOfResponsiveFieldToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabelOfBreakpoint: RTVedaLabelsOfResponsiveFieldToShopifyFieldLabel['newLabelOfBreakpoint'] = `t:${localeKey}`;
  const locales: RTVedaLabelsOfResponsiveFieldToShopifyFieldLabel['locales'] = languages.reduce<
    RTVedaLabelsOfResponsiveFieldToShopifyFieldLabel['locales']
  >(
    (res, language) => {
      const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
      const label_ = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      const breakpointTranslation =
        typeof label === 'string' ? translationsOfBreakpoints[defaultLanguage][breakpoint] : translationsOfBreakpoints[language][breakpoint];
      return {
        ...res,
        [language]: {
          [localeKey]: parentLabel_ ? `${parentLabel_} > ${label_} > ${breakpointTranslation}` : `${label_} > ${breakpointTranslation}`,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );
  return {
    newLabelOfBreakpoint: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newLabelOfBreakpoint,
  //   locales,
  // };
};
