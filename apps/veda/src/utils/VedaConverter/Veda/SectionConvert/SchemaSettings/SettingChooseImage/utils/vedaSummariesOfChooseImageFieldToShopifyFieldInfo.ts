import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfChooseImageField } from '../@consts/localKeyGenByVedaKeysOfChooseImageField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingChooseImage } from '../@types/ISCHEMA_SettingChooseImage';

interface RTVedaSummariesOfChooseImageFieldToShopifyFieldInfo {
  newInfoOfKey: string | undefined;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfChooseImageField}_${v4()}_`;

export const vedaSummariesOfChooseImageFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingChooseImage,
  key: typeof keys[number],
): RTVedaSummariesOfChooseImageFieldToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfKey: RTVedaSummariesOfChooseImageFieldToShopifyFieldInfo['newInfoOfKey'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfChooseImageFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfChooseImageFieldToShopifyFieldInfo['locales']
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
