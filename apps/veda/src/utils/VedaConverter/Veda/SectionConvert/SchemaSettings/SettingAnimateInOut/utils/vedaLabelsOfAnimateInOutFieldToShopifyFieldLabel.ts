import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfAnimateInOutField } from '../@consts/localKeyGenByVedaKeysOfAnimateInOutField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingAnimateInOut } from '../@types/ISCHEMA_SettingAnimateInOut';

interface RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel {
  newLabelOfKey: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfAnimateInOutField}_${v4()}_`;

export const vedaLabelsOfAnimateInOutFieldToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingAnimateInOut,
  key: typeof keys[number],
): RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  const newLabelOfKey: RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel['newLabelOfKey'] =
    typeof label === 'string' ? label : label[defaultLanguage];
  const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[defaultLanguage] : undefined;
  // const newLabelOfKey: RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel['newLabelOfKey'] = `t:${localeKey}`;
  const locales: RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel['locales'] = languages.reduce<
    RTVedaLabelsOfAnimateInOutFieldToShopifyFieldLabel['locales']
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
