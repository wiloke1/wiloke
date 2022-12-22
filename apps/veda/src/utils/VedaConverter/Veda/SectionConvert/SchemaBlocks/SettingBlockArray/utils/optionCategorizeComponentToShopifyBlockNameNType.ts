import { defaultLanguage, languages } from 'utils/VedaConverter/Veda/@consts/languages';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { v4 } from 'uuid';
import { SettingSelect } from '../../../SchemaSettings/SettingSelect/@types/SettingSelect';
import { SettingBlockArray } from '../@types/SettingBlockArray';

interface RTOptionCategorizeComponentToShopifyBlockType {
  name: string;
  type: string;
  locales: Locales;
}
const localKeyGenByVedaOptionCategorizeComponent = 'AAAA';
const createLocaleKey = () => `_${localKeyGenByVedaOptionCategorizeComponent}_${v4()}_`;

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const optionCategorizeComponentToShopifyBlockType = (
  array: SettingBlockArray,
  option: SettingSelect['options'][number],
): RTOptionCategorizeComponentToShopifyBlockType => {
  const arrayLabel = array.label;
  const localeKey = createLocaleKey();
  const default_translations = { [localeKey]: '' };
  // const newLabel: RTVedaLabelToShopifyFieldLabel['newLabel'] = `t:${localeKey}`;
  const locales: RTOptionCategorizeComponentToShopifyBlockType['locales'] = languages.reduce<
    RTOptionCategorizeComponentToShopifyBlockType['locales']
  >(
    (res, language) => {
      const arrayLabel_: string = typeof arrayLabel === 'string' ? arrayLabel : arrayLabel[language] ?? arrayLabel[defaultLanguage];
      return {
        ...res,
        [language]: {
          [localeKey]: `${arrayLabel_} > ${option.label}`.length >= 25 ? option.label : `${arrayLabel_} > ${option.label}`,
        },
      };
    },
    { en: default_translations, vi: default_translations, fr: default_translations },
  );

  const theoryBlockType = `${array.name}_${option.value}`;
  if (theoryBlockType.length >= 25) {
    const valueInCache = cacheKey.get(theoryBlockType);
    if (valueInCache) {
      return {
        locales,
        name: locales[defaultLanguage][localeKey],
        type: valueInCache,
      };
    } else {
      const newKey = randomShopifyFieldId();
      cacheKey.set(theoryBlockType, newKey);
      return {
        locales,
        name: locales[defaultLanguage][localeKey],
        type: newKey,
      };
    }
  } else {
    return {
      locales,
      name: locales[defaultLanguage][localeKey],
      type: `${array.name}_${option.value}`,
    };
  }
};
