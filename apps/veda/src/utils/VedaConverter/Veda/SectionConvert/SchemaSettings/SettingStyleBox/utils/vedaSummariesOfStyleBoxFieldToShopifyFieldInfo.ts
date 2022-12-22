import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfStyleBoxField } from '../@consts/localKeyGenByVedaKeysOfStyleBoxField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingStyleBox } from '../@types/ISCHEMA_SettingStyleBox';

interface RTVedaSummariesOfStyleBoxFieldToShopifyFieldInfo {
  newInfoOfKey: string | undefined;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfStyleBoxField}_${v4()}_`;

export const vedaSummariesOfStyleBoxFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingStyleBox,
  key: typeof keys[number],
): RTVedaSummariesOfStyleBoxFieldToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfKey: RTVedaSummariesOfStyleBoxFieldToShopifyFieldInfo['newInfoOfKey'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfStyleBoxFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfStyleBoxFieldToShopifyFieldInfo['locales']
  >(
    (res, language) => {
      const infoOfField =
        summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined;
      const breakpointTranslation = translationsOfKeys[language][key];
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
    newInfoOfKey: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newInfoOfKey,
  //   locales,
  // };
};
