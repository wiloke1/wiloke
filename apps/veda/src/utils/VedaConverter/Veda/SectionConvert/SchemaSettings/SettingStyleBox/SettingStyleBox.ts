import { mergeDeepLeft } from 'ramda';
import { TextField } from 'utils/VedaConverter/Shopify/InputSettings/TextField';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from 'utils/VedaConverter/Veda/utils/replaceExactVariableNameInLiquidCode';
import { keys } from './@consts/keys';
import { ILIQUID_SettingStyleBox } from './@types/ILIQUID_SettingStyleBox';
import { ISCHEMA_SettingStyleBox } from './@types/ISCHEMA_SettingStyleBox';
import { ISETTING_SettingStyleBox } from './@types/ISETTING_SettingStyleBox';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelsOfStyleBoxFieldToShopifyFieldLabel } from './utils/vedaLabelsOfStyleBoxFieldToShopifyFieldLabel';
import { vedaSummariesOfStyleBoxFieldToShopifyFieldInfo } from './utils/vedaSummariesOfStyleBoxFieldToShopifyFieldInfo';

interface RTSettingStyleBox {
  shopifyField: TextField[];
  locales: Locales;
}
export const SCHEMA_SettingStyleBox = ({ field, ...params }: ISCHEMA_SettingStyleBox): RTSettingStyleBox => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };
  const data = keys.reduce<TextField[]>((res, key) => {
    const { newLabelOfKey, locales: localesOfLabel } = vedaLabelsOfStyleBoxFieldToShopifyFieldLabel({ field, ...params }, key);
    const { newInfoOfKey, locales: localesOfInfo } = vedaSummariesOfStyleBoxFieldToShopifyFieldInfo({ field, ...params }, key);
    RLocales = mergeDeepLeft(RLocales, localesOfLabel);
    RLocales = mergeDeepLeft(RLocales, localesOfInfo);
    return res.concat({
      type: 'text',
      default: undefined,
      id: toShopifyFieldId({ field, ...params }, key),
      placeholder: undefined,
      info: newInfoOfKey,
      label: newLabelOfKey,
    });
  }, []);

  return {
    locales: RLocales,
    shopifyField: data as RTSettingStyleBox['shopifyField'],
  };
};

export const SETTING_SettingStyleBox = ({ field, ...params }: ISETTING_SettingStyleBox) => {
  return keys.reduce<Record<string, string | undefined>>((res, key) => {
    const fieldName = toShopifyFieldId({ field, ...params }, key);
    // check kĩ phòng lỗi
    const value = typeof field.children[key] === 'string' ? field.children[key] : undefined;
    if (value !== undefined) {
      return {
        ...res,
        [fieldName]: value,
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingStyleBox = ({ liquid, field, loopVariable, parentField }: ILIQUID_SettingStyleBox) => {
  // Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    return keys.reduce<string>((res, key) => {
      const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`;
      const source = `${loopVariable}.${field.name}.${key}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    return keys.reduce<string>((res, key) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
      const source = `${parentField.name}.${field.name}.${key}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  } else {
    return keys.reduce<string>((res, key) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
      const source = `${field.name}.${key}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
};
