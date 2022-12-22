import { mergeDeepLeft } from 'ramda';
import { TextareaField } from '../../../../Shopify/InputSettings/TextareaField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingTextArea } from './@types/ISCHEMA_SettingTextArea';
import { ISETTING_SettingTextArea } from './@types/ISETTING_SettingTextArea';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingTextArea } from './@types/ILIQUID_SettingTextArea';

interface RTSettingTextArea {
  shopifyField: TextareaField;
  locales: Locales;
}

export const SCHEMA_SettingTextArea = ({ field, ...params }: ISCHEMA_SettingTextArea): RTSettingTextArea => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'textarea',
      default: undefined,
      placeholder: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingTextArea = ({ field, ...params }: ISETTING_SettingTextArea) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'string' && !!field.children ? field.children : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: field.children };
  }
  return {};
};

export const LIQUID_SettingTextArea = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingTextArea) => {
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
