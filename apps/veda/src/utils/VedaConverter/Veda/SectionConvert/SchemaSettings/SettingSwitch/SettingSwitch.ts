import { mergeDeepLeft } from 'ramda';
import { CheckboxField } from '../../../../Shopify/InputSettings/CheckboxField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ILIQUID_SettingSwitch } from './@types/ILIQUID_SettingSwitch';
import { ISCHEMA_SettingSwitch } from './@types/ISCHEMA_SettingSwitch';
import { ISETTING_SettingSwitch } from './@types/ISETTING_SettingSwitch';
import { toShopifyFieldId } from './utils/toShopifyFieldId';

interface RTSettingSwitch {
  shopifyField: CheckboxField;
  locales: Locales;
}

export const SCHEMA_SettingSwitch = ({ field, ...params }: ISCHEMA_SettingSwitch): RTSettingSwitch => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'checkbox',
      default: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingSwitch = ({ field, ...params }: ISETTING_SettingSwitch) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'boolean' ? field.children : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingSwitch = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingSwitch) => {
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
