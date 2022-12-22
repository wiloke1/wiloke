import { mergeDeepLeft } from 'ramda';
import { TextField } from 'utils/VedaConverter/Shopify/InputSettings/TextField';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from 'utils/VedaConverter/Veda/utils/replaceExactVariableNameInLiquidCode';
import { ILIQUID_SettingFlexOrder } from './@types/ILIQUID_SettingFlexOrder';
import { ISCHEMA_SettingFlexOrder } from './@types/ISCHEMA_SettingFlexOrder';
import { ISETTING_SettingFlexOrder } from './@types/ISETTING_SettingFlexOrder';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaOptionLabelToShopifyFieldLabel } from './utils/vedaOptionLabelToShopifyFieldLabel';
import { vedaSummariesOfFlexOrderFieldToShopifyFieldInfo } from './utils/vedaSummariesOfFlexOrderFieldToShopifyFieldInfo';

interface RTSettingFlexOrder {
  shopifyField: TextField[];
  locales: Locales;
}
export const SCHEMA_SettingFlexOrder = ({ field, ...params }: ISCHEMA_SettingFlexOrder): RTSettingFlexOrder => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };

  const data = field.options.reduce<TextField[]>((res, option) => {
    const { newLabelOfKey, locales: localesOfLabel } = vedaOptionLabelToShopifyFieldLabel({ field, ...params }, option);
    const { newInfoOfKey, locales: localesOfInfo } = vedaSummariesOfFlexOrderFieldToShopifyFieldInfo({ field, ...params }, option);
    RLocales = mergeDeepLeft(RLocales, localesOfLabel);
    RLocales = mergeDeepLeft(RLocales, localesOfInfo);
    return res.concat({
      type: 'text',
      default: undefined,
      id: toShopifyFieldId({ field, ...params }, option),
      placeholder: undefined,
      info: newInfoOfKey,
      label: newLabelOfKey,
    });
  }, []);

  return {
    locales: RLocales,
    shopifyField: data,
  };
};

export const SETTING_SettingFlexOrder = ({ field, ...params }: ISETTING_SettingFlexOrder) => {
  return field.options.reduce<Record<string, string | undefined>>((res, option) => {
    const fieldName = toShopifyFieldId({ field, ...params }, option);
    // check kĩ phòng lỗi
    const value = typeof field.children[option.name] === 'string' ? field.children[option.name].toString() : undefined;
    if (value !== undefined) {
      return {
        ...res,
        [fieldName]: value,
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingFlexOrder = ({ liquid, loopVariable, field, parentField }: ILIQUID_SettingFlexOrder) => {
  // Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    return field.options.reduce<string>((res, options) => {
      const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, options)}`;
      const source = `${loopVariable}.${field.name}.${options.name}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    return field.options.reduce<string>((res, option) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, option)}"]`;
      const source = `${parentField.name}.${field.name}.${option.name}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  } else {
    return field.options.reduce<string>((res, option) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, option)}"]`;
      const source = `${field.name}.${option.name}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
};
