import { mergeDeepLeft } from 'ramda';
import { BlogField } from '../../../../Shopify/InputSettings/BlogField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ILIQUID_SettingBlogPicker } from './@types/ILIQUID_SettingBlogPicker';
import { ISCHEMA_SettingBlogPicker } from './@types/ISCHEMA_SettingBlogPicker';
import { ISETTING_SettingBlogPicker } from './@types/ISETTING_SettingBlogPicker';
import { toShopifyFieldId } from './utils/toShopifyFieldId';

interface RTSettingBlogPicker {
  shopifyField: BlogField;
  locales: Locales;
}

export const SCHEMA_SettingBlogPicker = ({ field, ...params }: ISCHEMA_SettingBlogPicker): RTSettingBlogPicker => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'blog',
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingBlogPicker = ({ field, ...params }: ISETTING_SettingBlogPicker) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'object' && !!field.children.handle ? field.children.handle : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingBlogPicker = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingBlogPicker) => {
  // Nếu field thuộc array
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
