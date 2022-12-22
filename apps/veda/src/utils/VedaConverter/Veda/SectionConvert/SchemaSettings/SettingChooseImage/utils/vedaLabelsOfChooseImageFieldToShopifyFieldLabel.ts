import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfChooseImageField } from '../@consts/localKeyGenByVedaKeysOfChooseImageField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingChooseImage } from '../@types/ISCHEMA_SettingChooseImage';

interface RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel {
  newLabelOfKey: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfChooseImageField}_${v4()}_`;

export const vedaLabelsOfChooseImageFieldToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingChooseImage,
  key: typeof keys[number],
): RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  const newLabelOfKey: RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel['newLabelOfKey'] =
    typeof label === 'string' ? label : label[defaultLanguage];
  const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[defaultLanguage] : undefined;
  // const newLabelOfKey: RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel['newLabelOfKey'] = `t:${localeKey}`;
  const locales: RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel['locales'] = languages.reduce<
    RTVedaLabelsOfChooseImageFieldToShopifyFieldLabel['locales']
  >(
    (res, language) => {
      const label_ = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      const breakpointTranslation = typeof label === 'string' ? translationsOfKeys[defaultLanguage][key] : translationsOfKeys[language][key];
      // const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
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
    newLabelOfKey,
    locales,
  };
};
