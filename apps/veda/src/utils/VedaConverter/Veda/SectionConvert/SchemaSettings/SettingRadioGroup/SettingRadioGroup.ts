import { mergeDeepLeft } from 'ramda';
import { RadioField } from '../../../../Shopify/InputSettings/RadioField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingRadioGroup } from './@types/ISCHEMA_SettingRadioGroup';
import { ISETTING_SettingRadioGroup } from './@types/ISETTING_SettingRadioGroup';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingRadioGroup } from './@types/ILIQUID_SettingRadioGroup';

interface RTSettingRadioGroup {
  shopifyField: RadioField;
  locales: Locales;
}

export const SCHEMA_SettingRadioGroup = ({ field, ...params }: ISCHEMA_SettingRadioGroup): RTSettingRadioGroup => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'radio',
      default: undefined,
      options: field.options.map(option => ({ label: option.label, value: option.value.toString() })),
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingRadioGroup = ({ field, ...params }: ISETTING_SettingRadioGroup) => {
  const value = typeof field.children === 'string' && !!field.children ? field.children : undefined;

  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingRadioGroup = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingRadioGroup) => {
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
