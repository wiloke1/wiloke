import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfAnimateInOutField } from '../@consts/localKeyGenByVedaKeysOfAnimateInOutField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingAnimateInOut } from '../@types/ISCHEMA_SettingAnimateInOut';

interface RTVedaSummariesOfAnimateInOutFieldToShopifyFieldInfo {
  newInfoOfKey: string | undefined;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfAnimateInOutField}_${v4()}_`;

export const vedaSummariesOfAnimateInOutFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingAnimateInOut,
  key: typeof keys[number],
): RTVedaSummariesOfAnimateInOutFieldToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfKey: RTVedaSummariesOfAnimateInOutFieldToShopifyFieldInfo['newInfoOfKey'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfAnimateInOutFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfAnimateInOutFieldToShopifyFieldInfo['locales']
  >(
    (res, language) => {
      const infoOfField =
        summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined;
      const keyTranslation = typeof summary === 'string' ? translationsOfKeys[defaultLanguage][key] : translationsOfKeys[language][key];
      return {
        ...res,
        [language]: {
          [localeKey]: infoOfField ? `${infoOfField} ${keyTranslation}` : undefined,
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
