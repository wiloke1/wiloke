import { mergeDeepLeft } from 'ramda';
import { LiquidField } from '../../../../Shopify/InputSettings/LiquidField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { ILIQUID_SettingText } from './@types/ILIQUID_SettingText';
import { ISCHEMA_SettingText } from './@types/ISCHEMA_SettingText';
import { ISETTING_SettingText } from './@types/ISETTING_SettingText';
import { isTranslationField } from './utils/isTranslationField';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { vedaSummaryToShopifyFieldInfo } from './utils/vedaSummaryToShopifyFieldInfo';

interface RTSettingText {
  shopifyField: LiquidField;
  locales: Locales;
}

export const SCHEMA_SettingText = ({ field, ...params }: ISCHEMA_SettingText): RTSettingText => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  const { newInfo, locales: infoLocales } = vedaSummaryToShopifyFieldInfo({ field, ...params });
  return {
    shopifyField: {
      label: newLabel,
      info: newInfo,
      id: toShopifyFieldId({ field, ...params }),
      type: 'liquid',
      default: undefined,
    },
    locales: mergeDeepLeft(labelLocales, infoLocales),
  };
};

export const SETTING_SettingText = ({ field, ...params }: ISETTING_SettingText, isPreview: boolean) => {
  // check kĩ phòng lỗi
  const value = typeof field.children === 'string' && !!field.children ? field.children : undefined;
  if (value !== undefined) {
    if (isTranslationField(field)) {
      const fieldName = toShopifyFieldId({ field, ...params });
      const keyOfTranslationWithoutPreview = value
        .replace(/{/g, '')
        .replace(/}/g, '')
        .trim();
      const keyOfTranslationWithPreview = keyOfTranslationWithoutPreview.replace('veda.', 'veda-pv.');
      return { [fieldName]: `{{ "${isPreview ? keyOfTranslationWithPreview : keyOfTranslationWithoutPreview}" | t }}` };
    } else {
      const fieldName = toShopifyFieldId({ field, ...params });
      return { [fieldName]: value };
    }
  }
  return {};
};

export const LIQUID_SettingText = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingText) => {
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
