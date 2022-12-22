import { mergeDeepLeft } from 'ramda';
import { TextField } from 'utils/VedaConverter/Shopify/InputSettings/TextField';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from 'utils/VedaConverter/Veda/utils/replaceExactVariableNameInLiquidCode';
import { keys } from './@consts/keys';
import { ILIQUID_SettingAnimateInOut } from './@types/ILIQUID_SettingAnimateInOut';
import { ISCHEMA_SettingAnimateInOut } from './@types/ISCHEMA_SettingAnimateInOut';
import { ISETTING_SettingAnimateInOut } from './@types/ISETTING_SettingAnimateInOut';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelsOfAnimateInOutFieldToShopifyFieldLabel } from './utils/vedaLabelsOfAnimateInOutFieldToShopifyFieldLabel';
import { vedaSummariesOfAnimateInOutFieldToShopifyFieldInfo } from './utils/vedaSummariesOfAnimateInOutFieldToShopifyFieldInfo';

interface RTSettingAnimateInOut {
  shopifyField: TextField[];
  locales: Locales;
}
export const SCHEMA_SettingAnimateInOut = ({ field, ...params }: ISCHEMA_SettingAnimateInOut): RTSettingAnimateInOut => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };
  const data = keys.reduce<TextField[]>((res, key) => {
    const { newLabelOfKey, locales: localesOfLabel } = vedaLabelsOfAnimateInOutFieldToShopifyFieldLabel({ field, ...params }, key);
    const { newInfoOfKey, locales: localesOfInfo } = vedaSummariesOfAnimateInOutFieldToShopifyFieldInfo({ field, ...params }, key);
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
    shopifyField: data as RTSettingAnimateInOut['shopifyField'],
  };
};

export const SETTING_SettingAnimateInOut = ({ field, ...params }: ISETTING_SettingAnimateInOut) => {
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

export const LIQUID_SettingAnimateInOut = ({ liquid, field, loopVariable, parentField }: ILIQUID_SettingAnimateInOut) => {
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
