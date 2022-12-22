import { defaultLanguage, languages } from 'utils/VedaConverter/Veda/@consts/languages';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { v4 } from 'uuid';
import { localKeyGenByVedaKeysOfFlexOrderField } from '../@consts/localKeyGenByVedaKeysOfFlexOrderField';
import { ISCHEMA_SettingFlexOrder } from '../@types/ISCHEMA_SettingFlexOrder';
import { Option } from '../@types/SettingFlexOrder';

interface RTVedaOptionLabelToShopifyFieldLabel {
  newLabelOfKey: string;
  locales: Locales;
}

const createLocaleKey = () => `_${localKeyGenByVedaKeysOfFlexOrderField}_${v4()}_`;

export const vedaOptionLabelToShopifyFieldLabel = (
  { field, parentField }: ISCHEMA_SettingFlexOrder,
  option: Option,
): RTVedaOptionLabelToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;
  const optionLabel = option.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabelOfKey: RTVedaOptionLabelToShopifyFieldLabel['newLabelOfKey'] = `t:${localeKey}`;
  const locales: RTVedaOptionLabelToShopifyFieldLabel['locales'] = languages.reduce<RTVedaOptionLabelToShopifyFieldLabel['locales']>(
    (res, language) => {
      const label_ = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      const optionTranslation = typeof optionLabel === 'string' ? optionLabel : optionLabel[language] ?? optionLabel[defaultLanguage];
      const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
      return {
        ...res,
        [language]: {
          [localeKey]: parentLabel_ ? `${parentLabel_} > ${label_} > ${optionTranslation}` : `${label_} > ${optionTranslation}`,
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
