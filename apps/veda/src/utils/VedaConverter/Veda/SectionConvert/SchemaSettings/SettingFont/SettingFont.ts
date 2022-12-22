import { mergeDeepLeft } from 'ramda';
import { TextField } from 'utils/VedaConverter/Shopify/InputSettings/TextField';
import { Locales } from 'utils/VedaConverter/Veda/@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from 'utils/VedaConverter/Veda/utils/replaceExactVariableNameInLiquidCode';
import { ILIQUID_SettingFont } from './@types/ILIQUID_SettingFont';
import { ISCHEMA_SettingFont } from './@types/ISCHEMA_SettingFont';
import { ISETTING_SettingFont } from './@types/ISETTING_SettingFont';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';

interface RTSettingFont {
  shopifyField: TextField;
  locales: Locales;
}

export const SCHEMA_SettingFont = ({ field, ...params }: ISCHEMA_SettingFont): RTSettingFont => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'text',
      default: undefined,
      placeholder: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingFont = ({ field, ...params }: ISETTING_SettingFont) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'string' && !!field.children ? field.children : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: field.children };
  }
  return {};
};

export const LIQUID_SettingFont = ({ liquid, field, loopVariable, parentField }: ILIQUID_SettingFont) => {
  /// Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    const target = `${loopVariable}.${toShopifyFieldId({ field, parentField })}`;
    const source = `${loopVariable}.${field.name}`;
    return replaceExactVariableNameInLiquidCode({ liquid, source, target });
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    const target = `section.settings["${toShopifyFieldId({ field, parentField })}"]`;
    const source = `${parentField.name}.${field.name}`;
    return replaceExactVariableNameInLiquidCode({ liquid, source, target });
  } else {
    const target = `section.settings["${toShopifyFieldId({ field, parentField })}"]`;
    const source = field.name;
    return replaceExactVariableNameInLiquidCode({ liquid, source, target });
  }
};
