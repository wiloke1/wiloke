import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaPositionsOfSpaceField } from '../@consts/localKeyGenByVedaPositionsOfSpaceField';
import { positions } from '../@consts/positions';
import { translationsOfPositions } from '../@consts/translationsOfPositions';
import { ISCHEMA_SettingSpace } from '../@types/ISCHEMA_SettingSpace';

interface RTVedaSummariesOfSpaceFieldToShopifyFieldInfo {
  newInfoOfPosition: string | undefined;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaPositionsOfSpaceField}_${v4()}_`;

export const vedaSummariesOfSpaceFieldToShopifyFieldInfo = (
  { field }: ISCHEMA_SettingSpace,
  position: typeof positions[number],
): RTVedaSummariesOfSpaceFieldToShopifyFieldInfo => {
  const { summary = '' } = field;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newInfoOfPosition: RTVedaSummariesOfSpaceFieldToShopifyFieldInfo['newInfoOfPosition'] = `t:${localeKey}`;
  const locales: RTVedaSummariesOfSpaceFieldToShopifyFieldInfo['locales'] = languages.reduce<
    RTVedaSummariesOfSpaceFieldToShopifyFieldInfo['locales']
  >(
    (res, language) => {
      const infoOfField =
        summary === '' ? undefined : typeof summary === 'string' ? summary : typeof summary === 'object' ? summary[language] : undefined;
      const positionTranslation = translationsOfPositions[language][position];
      return {
        ...res,
        [language]: {
          [localeKey]: infoOfField ? `${infoOfField} ${positionTranslation}` : undefined,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );

  return {
    newInfoOfPosition: locales[defaultLanguage][localeKey],
    locales,
  };
};
