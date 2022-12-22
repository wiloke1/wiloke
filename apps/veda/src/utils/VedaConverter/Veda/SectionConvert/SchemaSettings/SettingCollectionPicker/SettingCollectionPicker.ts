import { mergeDeepLeft } from 'ramda';
import { CollectionField } from '../../../../Shopify/InputSettings/CollectionField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';
import { ILIQUID_SettingCollectionPicker } from './@types/ILIQUID_SettingCollectionPicker';
import { ISCHEMA_SettingCollectionPicker } from './@types/ISCHEMA_SettingCollectionPicker';
import { ISETTING_SettingCollectionPicker } from './@types/ISETTING_SettingCollectionPicker';
import { toShopifyFieldId } from './utils/toShopifyFieldId';

interface RTSettingCollectionPicker {
  shopifyField: CollectionField;
  locales: Locales;
}

export const SCHEMA_SettingCollectionPicker = ({ field, ...params }: ISCHEMA_SettingCollectionPicker): RTSettingCollectionPicker => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'collection',
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingCollectionPicker = ({ field, ...params }: ISETTING_SettingCollectionPicker) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'object' && !!field.children.handle ? field.children.handle : undefined;
  if (value !== undefined) {
    const fieldName = toShopifyFieldId({ field, ...params });
    return { [fieldName]: value };
  }
  return {};
};

export const LIQUID_SettingCollectionPicker = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingCollectionPicker) => {
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
