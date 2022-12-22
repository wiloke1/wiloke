import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { localKeyGenByVedaKeysOfStyleBoxField } from '../@consts/localKeyGenByVedaKeysOfStyleBoxField';
import { keys } from '../@consts/keys';
import { translationsOfKeys } from '../@consts/translationsOfKeys';
import { ISCHEMA_SettingStyleBox } from '../@types/ISCHEMA_SettingStyleBox';

interface RTVedaLabelsOfStyleBoxFieldToShopifyFieldLabel {
  newLabelOfKey: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfStyleBoxField}_${v4()}_`;

export const vedaLabelsOfStyleBoxFieldToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingStyleBox,
  key: typeof keys[number],
): RTVedaLabelsOfStyleBoxFieldToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabelOfKey: RTVedaLabelsOfStyleBoxFieldToShopifyFieldLabel['newLabelOfKey'] = `t:${localeKey}`;
  const locales: RTVedaLabelsOfStyleBoxFieldToShopifyFieldLabel['locales'] = languages.reduce<
    RTVedaLabelsOfStyleBoxFieldToShopifyFieldLabel['locales']
  >(
    (res, language) => {
      const label_ = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
      const breakpointTranslation = typeof label === 'string' ? translationsOfKeys[defaultLanguage][key] : translationsOfKeys[language][key];
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
    newLabelOfKey: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newLabelOfKey,
  //   locales,
  // };
};
