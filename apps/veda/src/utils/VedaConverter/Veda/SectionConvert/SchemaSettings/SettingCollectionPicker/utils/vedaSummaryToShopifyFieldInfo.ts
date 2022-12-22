import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { ISCHEMA_SettingCollectionPicker } from '../@types/ISCHEMA_SettingCollectionPicker';

const localKeyGenByVedaFieldSummary = 'FieldGenByVedaFieldSummary';

const createLocaleKey = () => `_${localKeyGenByVedaFieldSummary}_${v4()}_`;

interface RTVedaSummaryToShopifyFieldInfo {
  newInfo: string | undefined;
  locales: Locales;
}

type IVedaSummaryToShopifyFieldInfo = ISCHEMA_SettingCollectionPicker;
export const vedaSummaryToShopifyFieldInfo = ({ field }: IVedaSummaryToShopifyFieldInfo): RTVedaSummaryToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const defaultTranslations = { [localeKey]: '' };

  // const newInfo: RTVedaSummaryToShopifyFieldInfo['newInfo'] = `t:${localeKey}`;
  const locales: RTVedaSummaryToShopifyFieldInfo['locales'] = languages.reduce<RTVedaSummaryToShopifyFieldInfo['locales']>(
    (res, language) => {
      return {
        ...res,
        [language]: {
          [localeKey]:
            summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined,
        },
      };
    },
    { en: defaultTranslations, vi: defaultTranslations, fr: defaultTranslations },
  );
  return {
    newInfo: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newInfo,
  //   locales,
  // };
};
