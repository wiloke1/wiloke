import { mergeDeepLeft } from 'ramda';
import { NumberField } from 'utils/VedaConverter/Shopify/InputSettings/NumberField';
import { TextField } from '../../../../Shopify/InputSettings/TextField';
import { Locales } from '../../../@types/ShopifyLocales';
import { replaceExactVariableNameInLiquidCode } from '../../../utils/replaceExactVariableNameInLiquidCode';
import { vedaLabelsOfChooseImageFieldToShopifyFieldLabel } from './utils/vedaLabelsOfChooseImageFieldToShopifyFieldLabel';
import { vedaSummariesOfChooseImageFieldToShopifyFieldInfo } from './utils/vedaSummariesOfChooseImageFieldToShopifyFieldInfo';
import { ILIQUID_SettingChooseImage } from './@types/ILIQUID_SettingChooseImage';
import { ISCHEMA_SettingChooseImage } from './@types/ISCHEMA_SettingChooseImage';
import { ISETTING_SettingChooseImage } from './@types/ISETTING_SettingChooseImage';
import { toShopifyFieldId } from './utils/toShopifyFieldId';
import { keys } from './@consts/keys';

interface RTSettingChooseImage {
  shopifyField: [TextField, NumberField, NumberField];
  locales: Locales;
}

export const SCHEMA_SettingChooseImage = ({ field, ...params }: ISCHEMA_SettingChooseImage): RTSettingChooseImage => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };
  const data = keys.reduce<Array<TextField | NumberField>>((res, key) => {
    const { newLabelOfKey, locales: localesOfLabel } = vedaLabelsOfChooseImageFieldToShopifyFieldLabel({ field, ...params }, key);
    const { newInfoOfKey, locales: localesOfInfo } = vedaSummariesOfChooseImageFieldToShopifyFieldInfo({ field, ...params }, key);
    RLocales = mergeDeepLeft(RLocales, localesOfLabel);
    RLocales = mergeDeepLeft(RLocales, localesOfInfo);
    if (key === 'src') {
      const shopifyField: TextField = {
        type: 'text',
        default: undefined,
        id: toShopifyFieldId({ field, ...params }, key),
        placeholder: undefined,
        info: newInfoOfKey,
        label: newLabelOfKey,
      };
      return res.concat(shopifyField);
    }
    if (key === 'width' || key === 'height') {
      const shopifyField: NumberField = {
        type: 'number',
        default: undefined,
        id: toShopifyFieldId({ field, ...params }, key),
        placeholder: undefined,
        info: newInfoOfKey,
        label: newLabelOfKey,
      };
      return res.concat(shopifyField);
    }
    return res;
  }, []);

  return {
    locales: RLocales,
    shopifyField: data as RTSettingChooseImage['shopifyField'],
  };
};

export const SETTING_SettingChooseImage = ({ field, ...params }: ISETTING_SettingChooseImage) => {
  return keys.reduce<Record<string, string | number | undefined>>((res, key) => {
    const fieldName = toShopifyFieldId({ field, ...params }, key);
    // check kĩ phòng lỗi
    const value =
      typeof field.children === 'object'
        ? typeof field.children[key] === 'string' && !!field.children[key]
          ? field.children[key]
          : typeof field.children[key] === 'number'
          ? field.children[key]
          : undefined
        : undefined;
    if (value !== undefined) {
      return {
        ...res,
        [fieldName]: value,
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingChooseImage = ({ field, parentField, liquid, loopVariable }: ILIQUID_SettingChooseImage) => {
  // Nếu field thuộc array
  // - loopVariable nếu là array ->  Array được dùng trong forloop -> Thế `${loopVariable}.${field.name}.${key}` = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`
  //   Example: --> for item in content --> item.icon_design.id ==> KQ: item.content__icon_design.id
  if (loopVariable) {
    return keys.reduce<string>((res, key) => {
      if (key === 'src') {
        const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`;
        const sourceDotSrc = `${loopVariable}.${field.name}.${key}`;
        const sourceImageObject = `${loopVariable}.${field.name}`;
        // Replace cả những syntax item.image và item.image.src
        const liquidReplaceImageSrc = replaceExactVariableNameInLiquidCode({
          liquid: res,
          source: sourceDotSrc,
          target,
        });
        return replaceExactVariableNameInLiquidCode({
          liquid: liquidReplaceImageSrc,
          source: sourceImageObject,
          target,
        });
      } else {
        const target = `${loopVariable}.${toShopifyFieldId({ field, parentField }, key)}`;
        const source = `${loopVariable}.${field.name}.${key}`;
        return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
      }
    }, liquid);
  }
  // Nếu field thuộc object
  // - parentField nếu là object -> Object được flat thành các "shopify input settings" -> Thế `${parentField.name}.${field.name}.${key}` = toShopifyFieldId
  //   Example: --> heading.icon_design.id ==> KQ: heading__icon_design.id
  else if (parentField) {
    return keys.reduce<string>((res, key) => {
      if (key === 'src') {
        const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
        const sourceDotSrc = `${parentField.name}.${field.name}.${key}`;
        const sourceImageObject = `${parentField.name}.${field.name}`;
        // Replace cả những syntax item.image và item.image.src
        const liquidReplaceImageSrc = replaceExactVariableNameInLiquidCode({ liquid: res, source: sourceDotSrc, target });
        return replaceExactVariableNameInLiquidCode({
          liquid: liquidReplaceImageSrc,
          source: sourceImageObject,
          target,
        });
      } else {
        const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
        const source = `${parentField.name}.${field.name}.${key}`;
        return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
      }
    }, liquid);
  } else {
    return keys.reduce<string>((res, key) => {
      if (key === 'src') {
        const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
        const sourceDotSrc = `${field.name}.${key}`;
        const sourceImageObject = `${field.name}`;
        // Replace cả những syntax item.image và item.image.src
        const liquidReplaceImageSrc = replaceExactVariableNameInLiquidCode({
          liquid: res,
          source: sourceDotSrc,
          target,
        });
        return replaceExactVariableNameInLiquidCode({
          liquid: liquidReplaceImageSrc,
          source: sourceImageObject,
          target,
        });
      } else {
        const target = `section.settings["${toShopifyFieldId({ field, parentField }, key)}"]`;
        const source = `${field.name}.${key}`;
        return replaceExactVariableNameInLiquidCode({ liquid: res, source, target });
      }
    }, liquid);
  }
};
