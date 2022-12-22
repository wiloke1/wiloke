import { mergeDeepLeft } from 'ramda';
import { NumberField } from '../../../../Shopify/InputSettings/NumberField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { breakpoints } from './@consts/breakpoints';
import { ILIQUID_SettingResponsive } from './@types/ILIQUID_SettingResponsive';
import { ISCHEMA_SettingResponsive } from './@types/ISCHEMA_SettingResponsive';
import { ISETTING_SettingResponsive } from './@types/ISETTING_SettingResponsive';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { vedaLabelsOfResponsiveFieldToShopifyFieldLabel } from './utils/vedaLabelsOfResponsiveFieldToShopifyFieldLabel';
import { vedaSummariesOfResponsiveFieldToShopifyFieldInfo } from './utils/vedaSummariesOfResponsiveFieldToShopifyFieldInfo';

interface RTSettingResponsive {
  locales: Locales;
  shopifyField: [NumberField, NumberField, NumberField, NumberField];
}

export const SCHEMA_SettingResponsive = ({ field, ...params }: ISCHEMA_SettingResponsive): RTSettingResponsive => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };
  const data = breakpoints.reduce<NumberField[]>((res, breakpoint) => {
    const { newLabelOfBreakpoint, locales: localesOfLabel } = vedaLabelsOfResponsiveFieldToShopifyFieldLabel({ field, ...params }, breakpoint);
    const { newInfoOfBreakpoint, locales: localesOfInfo } = vedaSummariesOfResponsiveFieldToShopifyFieldInfo({ field, ...params }, breakpoint);
    RLocales = mergeDeepLeft(RLocales, localesOfLabel);
    RLocales = mergeDeepLeft(RLocales, localesOfInfo);
    return res.concat({
      type: 'number',
      default: undefined,
      id: toShopifyFieldId({ field, ...params }, breakpoint),
      placeholder: undefined,
      info: newInfoOfBreakpoint,
      label: newLabelOfBreakpoint,
    });
  }, []);

  return {
    locales: RLocales,
    shopifyField: data as RTSettingResponsive['shopifyField'],
  };
};

export const SETTING_SettingResponsive = ({ field, ...params }: ISETTING_SettingResponsive) => {
  return breakpoints.reduce<Record<string, number>>((res, breakpoint) => {
    const fieldName = toShopifyFieldId({ field, ...params }, breakpoint);
    // check kĩ phòng lỗi
    const value = typeof field.children[breakpoint] === 'number' ? field.children[breakpoint] : undefined;
    if (value !== undefined) {
      return {
        ...res,
        [fieldName]: value,
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingResponsive = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingResponsive) => {
  // Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    return breakpoints.reduce<string>((res, breakpoint) => {
      const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, breakpoint)}`;
      const source = `${loopVariable}.${field.name}.${breakpoint}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    return breakpoints.reduce<string>((res, breakpoint) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, breakpoint)}"]`;
      const source = `${parentField.name}.${field.name}.${breakpoint}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  } else {
    return breakpoints.reduce<string>((res, breakpoint) => {
      const target = `section.settings["${toShopifyFieldId({ field, parentField }, breakpoint)}"]`;
      const source = `${field.name}.${breakpoint}`;
      return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
    }, liquid);
  }
};
