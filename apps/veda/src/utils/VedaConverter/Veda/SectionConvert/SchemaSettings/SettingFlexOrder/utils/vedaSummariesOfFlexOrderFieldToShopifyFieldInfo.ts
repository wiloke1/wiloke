import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfFlexOrderField } from '../@consts/localKeyGenByVedaKeysOfFlexOrderField';
import { ISCHEMA_SettingFlexOrder } from '../@types/ISCHEMA_SettingFlexOrder';
import { Option } from '../@types/SettingFlexOrder';

interface RTVedaSummariesOfFlexOrderFieldToShopifyFieldInfo {
  newInfoOfKey: string | undefined;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfFlexOrderField}_${v4()}_`;

export const vedaSummariesOfFlexOrderFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingFlexOrder,
  option: Option,
): RTVedaSummariesOfFlexOrderFieldToShopifyFieldInfo => {
  const { summary = '' } = field;
  const optionLabel = option.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfKey: RTVedaSummariesOfFlexOrderFieldToShopifyFieldInfo['newInfoOfKey'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfFlexOrderFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfFlexOrderFieldToShopifyFieldInfo['locales']
  >(
    (res, language) => {
      const infoOfField =
        summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined;
      const optionTranslation = typeof optionLabel === 'string' ? optionLabel : optionLabel[defaultLanguage];
      return {
        ...res,
        [language]: {
          [localeKey]: infoOfField ? `${infoOfField} ${optionTranslation}` : undefined,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );
  return {
    newInfoOfKey: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newInfoOfKey,
  //   locales,
  // };
};
