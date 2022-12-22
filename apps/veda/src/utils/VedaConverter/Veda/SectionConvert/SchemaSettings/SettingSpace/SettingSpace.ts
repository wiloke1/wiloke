import { mergeDeepLeft } from 'ramda';
import { NumberField } from '../../../../Shopify/InputSettings/NumberField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { positions } from './@consts/positions';
import { ILIQUID_SettingSpace } from './@types/ILIQUID_SettingSpace';
import { ISCHEMA_SettingSpace } from './@types/ISCHEMA_SettingSpace';
import { ISETTING_SettingSpace } from './@types/ISETTING_SettingSpace';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelsOfSpaceFieldToShopifyFieldLabel } from './utils/vedaLabelsOfSpaceFieldToShopifyFieldLabel';
import { vedaSummariesOfSpaceFieldToShopifyFieldInfo } from './utils/vedaSummariesOfSpaceFieldToShopifyFieldInfo';

interface RTSettingSpace {
  locales: Locales;
  shopifyField: [NumberField, NumberField, NumberField, NumberField];
}

export const SCHEMA_SettingSpace = ({ field, ...params }: ISCHEMA_SettingSpace): RTSettingSpace => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };
  const data = positions.reduce<NumberField[]>((res, position) => {
    const { newLabelOfPosition, locales: localesOfLabel } = vedaLabelsOfSpaceFieldToShopifyFieldLabel({ field, ...params }, position);
    const { newInfoOfPosition, locales: localesOfInfo } = vedaSummariesOfSpaceFieldToShopifyFieldInfo({ field, ...params }, position);
    RLocales = mergeDeepLeft(RLocales, localesOfLabel);
    RLocales = mergeDeepLeft(RLocales, localesOfInfo);
    return res.concat({
      type: 'number',
      default: undefined,
      id: toShopifyFieldId({ field, ...params }, position),
      placeholder: undefined,
      info: newInfoOfPosition,
      label: newLabelOfPosition,
    });
  }, []);

  return {
    locales: RLocales,
    shopifyField: data as RTSettingSpace['shopifyField'],
  };
};

export const SETTING_SettingSpace = ({ field, ...params }: ISETTING_SettingSpace) => {
  return positions.reduce<Record<string, number | undefined>>((res, position) => {
    const fieldName = toShopifyFieldId({ field, ...params }, position);
    // check kĩ phòng lỗi
    const value = typeof field.children[position] === 'number' ? field.children[position] : undefined;
    if (value !== undefined) {
      return {
        ...res,
        [fieldName]: value,
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingSpace = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingSpace) => {
  // Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    return positions.reduce<string>((res, position) => {
      const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, position)}`;
      const source = `${loopVariable}.${field.name}.${position}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    return positions.reduce<string>((res, position) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, position)}"]`;
      const source = `${parentField.name}.${field.name}.${position}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  } else {
    return positions.reduce<string>((res, position) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, position)}"]`;
      const source = `${field.name}.${position}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
};
