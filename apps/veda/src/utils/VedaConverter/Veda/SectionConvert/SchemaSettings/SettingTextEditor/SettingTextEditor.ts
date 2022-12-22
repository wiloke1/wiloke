import { mergeDeepLeft } from 'ramda';
import { RichtextField } from '../../../../Shopify/InputSettings/RichtextField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingTextEditor } from './@types/ISCHEMA_SettingTextEditor';
import { ISETTING_SettingTextEditor } from './@types/ISETTING_SettingTextEditor';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingTextEditor } from './@types/ILIQUID_SettingTextEditor';

interface RTSettingText {
  shopifyField: RichtextField;
  locales: Locales;
}
export const SCHEMA_SettingTextEditor = ({ field, ...params }: ISCHEMA_SettingTextEditor): RTSettingText => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'richtext',
      default: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingTextEditor = ({ field, ...params }: ISETTING_SettingTextEditor) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'string' && !!field.children ? field.children : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    const filterMetafieldTagToShopifyExpect = field.children.replace(/\s*\|\s*metafield_tag/g, '.value');
    return { [fieldName]: filterMetafieldTagToShopifyExpect };
  }
  return {};
};

export const LIQUID_SettingTextEditor = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingTextEditor) => {
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
