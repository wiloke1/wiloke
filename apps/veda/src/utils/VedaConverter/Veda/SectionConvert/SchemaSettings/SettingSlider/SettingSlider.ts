import { mergeDeepLeft } from 'ramda';
import { NumberField } from '../../../../Shopify/InputSettings/NumberField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingSlider } from './@types/ISCHEMA_SettingSlider';
import { ISETTING_SettingSlider } from './@types/ISETTING_SettingSlider';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingSlider } from './@types/ILIQUID_SettingSlider';

interface RTSettingSlider {
  shopifyField: NumberField;
  locales: Locales;
}

export const SCHEMA_SettingSlider = ({ field, ...params }: ISCHEMA_SettingSlider): RTSettingSlider => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'number',
      default: undefined,
      placeholder: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingSlider = ({ field, ...params }: ISETTING_SettingSlider) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'number' ? field.children : undefined;
  const fieldName = toShopifyFieldId({ field, ...params });
  if (value !== undefined) {
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingSlider = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingSlider) => {
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
