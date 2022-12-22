import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaBreakpointsOfResponsiveField } from '../@consts/localKeyGenByVedaBreakpointsOfResponsiveField';
import { translationsOfBreakpoints } from '../@consts/translationsOfBreakpoints';
import { ISCHEMA_SettingResponsive } from '../@types/ISCHEMA_SettingResponsive';
import { ResponsiveValue } from '../@types/SettingResponsive';

interface RTVedaSummariesOfResponsiveFieldToShopifyFieldInfo {
  newInfoOfBreakpoint: string | undefined;
  // newInfoOfBreakpoint: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaBreakpointsOfResponsiveField}_${v4()}_`;

export const vedaSummariesOfResponsiveFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingResponsive,
  breakpoint: keyof ResponsiveValue,
): RTVedaSummariesOfResponsiveFieldToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfBreakpoint: RTVedaSummariesOfResponsiveFieldToShopifyFieldInfo['newInfoOfBreakpoint'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfResponsiveFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfResponsiveFieldToShopifyFieldInfo['locales']
  >(
    (res, language) => {
      const infoOfField =
        summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined;
      const breakpointTranslation = translationsOfBreakpoints[language][breakpoint];
      return {
        ...res,
        [language]: {
          [localeKey]: infoOfField ? `${infoOfField} ${breakpointTranslation}` : undefined,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );
  return {
    newInfoOfBreakpoint: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newInfoOfBreakpoint,
  //   locales,
  // };
};
