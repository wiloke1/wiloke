import { mergeDeepLeft } from 'ramda';
import { ProductListField } from '../../../../Shopify/InputSettings/ProductListField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ISCHEMA_SettingMultiProductsPicker } from './@types/ISCHEMA_SettingMultiProductsPicker';
import { ISETTING_SettingMultiProductsPicker } from './@types/ISETTING_SettingMultiProductsPicker';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { ILIQUID_SettingMultiProductsPicker } from './@types/ILIQUID_SettingMultiProductsPicker';

interface RTSettingMultiProductsPicker {
  shopifyField: ProductListField;
  locales: Locales;
}

export const SCHEMA_SettingMultiProductsPicker = ({ field, ...params }: ISCHEMA_SettingMultiProductsPicker): RTSettingMultiProductsPicker => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'product_list',
      limit: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingMultiProductsPicker = ({ field, ...params }: ISETTING_SettingMultiProductsPicker) => {
  const value = Array.isArray(field.children) ? field.children.map(({ handle }) => handle).filter(Boolean) : undefined;
  if (value?.length) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingMultiProductsPicker = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingMultiProductsPicker) => {
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
