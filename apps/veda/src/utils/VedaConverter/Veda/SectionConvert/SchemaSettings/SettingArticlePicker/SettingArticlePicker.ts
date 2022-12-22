import { mergeDeepLeft } from 'ramda';
import { ArticleField } from '../../../../Shopify/InputSettings/ArticleField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { ILIQUID_SettingArticlePicker } from './@types/ILIQUID_SettingArticlePicker';
import { ISCHEMA_SettingArticlePicker } from './@types/ISCHEMA_SettingArticlePicker';
import { ISETTING_SettingArticlePicker } from './@types/ISETTING_SettingArticlePicker';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';

interface RTSettingArticlePicker {
  shopifyField: ArticleField;
  locales: Locales;
}

export const SCHEMA_SettingArticlePicker = ({ field, ...params }: ISCHEMA_SettingArticlePicker): RTSettingArticlePicker => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'article',
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingArticlePicker = ({ field, ...params }: ISETTING_SettingArticlePicker) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'object' && !!field.children.handle ? field.children.handle : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingArticlePicker = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingArticlePicker) => {
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
