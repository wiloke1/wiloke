import { mergeDeepLeft } from 'ramda';
import { ProductField } from '../../../../Shopify/InputSettings/ProductField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingSingleProductPicker } from './@types/ISCHEMA_SettingSingleProductPicker';
import { ISETTING_SettingSingleProductPicker } from './@types/ISETTING_SettingSingleProductPicker';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingSingleProductPicker } from './@types/ILIQUID_SettingSingleProductPicker';

interface RTSettingSingleProductPicker {
  shopifyField: ProductField;
  locales: Locales;
}

export const SCHEMA_SettingSingleProductPicker = ({ field, ...params }: ISCHEMA_SettingSingleProductPicker): RTSettingSingleProductPicker => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'product',
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingSingleProductPicker = ({ field, ...params }: ISETTING_SettingSingleProductPicker) => {
  const value = typeof field.children === 'object' && !!field.children.handle ? field.children.handle : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingSingleProductPicker = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingSingleProductPicker) => {
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
