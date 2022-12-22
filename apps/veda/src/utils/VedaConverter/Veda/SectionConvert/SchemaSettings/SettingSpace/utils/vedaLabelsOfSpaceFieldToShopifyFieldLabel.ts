import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaPositionsOfSpaceField } from '../@consts/localKeyGenByVedaPositionsOfSpaceField';
import { positions } from '../@consts/positions';
import { translationsOfPositions } from '../@consts/translationsOfPositions';
import { ISCHEMA_SettingSpace } from '../@types/ISCHEMA_SettingSpace';

interface RTVedaLabelsOfSpaceFieldToShopifyFieldLabel {
  newLabelOfPosition: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaPositionsOfSpaceField}_${v4()}_`;

export const vedaLabelsOfSpaceFieldToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingSpace,
  position: typeof positions[number],
): RTVedaLabelsOfSpaceFieldToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabelOfPosition: RTVedaLabelsOfSpaceFieldToShopifyFieldLabel['newLabelOfPosition'] = `t:${localeKey}`;
  const locales: RTVedaLabelsOfSpaceFieldToShopifyFieldLabel['locales'] = languages.reduce<RTVedaLabelsOfSpaceFieldToShopifyFieldLabel['locales']>(
    (res, language) => {
      const label_ = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      const positionTranslation =
        typeof label === 'string' ? translationsOfPositions[defaultLanguage][position] : translationsOfPositions[language][position];
      const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
      return {
        ...res,
        [language]: {
          [localeKey]: parentLabel_ ? `${parentLabel_} > ${label_} > ${positionTranslation}` : `${label_} > ${positionTranslation}`,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );
  return {
    newLabelOfPosition: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newLabelOfPosition,
  //   locales,
  // };
};
