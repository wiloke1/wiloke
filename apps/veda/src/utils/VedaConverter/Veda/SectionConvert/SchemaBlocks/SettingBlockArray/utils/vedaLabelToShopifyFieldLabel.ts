import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { SettingBlockArray } from '../@types/SettingBlockArray';

const localKeyGenByVedaFieldLabel = 'FieldGenByVedaFieldLabel';

const createLocaleKey = () => `_${localKeyGenByVedaFieldLabel}_${v4()}_`;

interface RTVedaLabelToShopifyFieldLabel {
  newLabel: string;
  locales: Locales;
}

export const vedaLabelToShopifyFieldLabel = (array: SettingBlockArray): RTVedaLabelToShopifyFieldLabel => {
  const label = array.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabel: RTVedaLabelToShopifyFieldLabel['newLabel'] = `t:${localeKey}`;
  const locales: RTVedaLabelToShopifyFieldLabel['locales'] = languages.reduce<RTVedaLabelToShopifyFieldLabel['locales']>(
    (res, language) => {
      const label_: string = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      return {
        ...res,
        [language]: {
          [localeKey]: label_,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );
  return {
    newLabel: locales[defaultLanguage][localeKey],
    locales,
  };
  // return {
  //   newLabel,
  //   locales,
  // };
};
