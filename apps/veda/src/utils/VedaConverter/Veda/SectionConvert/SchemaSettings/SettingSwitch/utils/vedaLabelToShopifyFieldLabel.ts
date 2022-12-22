import { v4 } from 'uuid';
import { defaultLanguage, languages } from '../../../../@consts/languages';
import { Locales } from '../../../../@types/ShopifyLocales';
import { ISCHEMA_SettingSwitch } from '../@types/ISCHEMA_SettingSwitch';

const localKeyGenByVedaFieldLabel = 'FieldGenByVedaFieldLabel';

const createLocaleKey = () => `_${localKeyGenByVedaFieldLabel}_${v4()}_`;

interface RTVedaLabelToShopifyFieldLabel {
  newLabel: string;
  locales: Locales;
}

type IVedaLabelToShopifyFieldLabel = ISCHEMA_SettingSwitch;
export const vedaLabelToShopifyFieldLabel = ({ field, parentField }: IVedaLabelToShopifyFieldLabel): RTVedaLabelToShopifyFieldLabel => {
  const label = field.label;
  const parentLabel = parentField?.label;

  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };

  // const newLabel: RTVedaLabelToShopifyFieldLabel['newLabel'] = `t:${localeKey}`;
  const locales: RTVedaLabelToShopifyFieldLabel['locales'] = languages.reduce<RTVedaLabelToShopifyFieldLabel['locales']>(
    (res, language) => {
      const parentLabel_ = typeof parentLabel === 'string' ? parentLabel : typeof parentLabel === 'object' ? parentLabel[language] : undefined;
      const label_: string = typeof label === 'string' ? label : label[language] ?? label[defaultLanguage];
      return {
        ...res,
        [language]: {
          [localeKey]: parentLabel_ ? `${parentLabel_} > ${label_}` : label_,
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
