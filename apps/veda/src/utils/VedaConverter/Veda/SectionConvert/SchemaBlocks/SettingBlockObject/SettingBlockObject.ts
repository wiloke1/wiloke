import { flatten, mergeDeepLeft } from 'ramda';
import { ArticleField } from '../../../../Shopify/InputSettings/ArticleField';
import { BlogField } from '../../../../Shopify/InputSettings/BlogField';
import { CheckboxField } from '../../../../Shopify/InputSettings/CheckboxField';
import { CollectionField } from '../../../../Shopify/InputSettings/CollectionField';
import { HeaderField } from '../../../../Shopify/SidebarSettings/HeaderField';
import { ParagraphField } from '../../../../Shopify/SidebarSettings/ParagraphField';
import { ProductField } from '../../../../Shopify/InputSettings/ProductField';
import { ProductListField } from '../../../../Shopify/InputSettings/ProductListField';
import { RadioField } from '../../../../Shopify/InputSettings/RadioField';
import { NumberField } from '../../../../Shopify/InputSettings/NumberField';
import { SelectField } from '../../../../Shopify/InputSettings/SelectField';
import { TextareaField } from '../../../../Shopify/InputSettings/TextareaField';
import { TextField } from '../../../../Shopify/InputSettings/TextField';
import { Locales } from '../../../@types/ShopifyLocales';
import { SettingBlockObject } from './@types/SettingBlockObject';
import { SCHEMA_Converters } from './utils/SCHEMA_Converters';
import { SETTING_Converters } from './utils/SETTING_Converters';
import { LIQUID_Converters } from './utils/LIQUID_Converters';

interface RTSettingBlockObject {
  locales: Locales;
  shopifyField: Array<
    | ArticleField
    | BlogField
    | CheckboxField
    | CollectionField
    | HeaderField
    | ParagraphField
    | ProductField
    | ProductListField
    | RadioField
    | NumberField
    | SelectField
    | TextareaField
    | TextField
  >;
}

export const SCHEMA_SettingBlockObject = (object: SettingBlockObject): RTSettingBlockObject => {
  let RLocales: Locales = {
    en: {},
    fr: {},
    vi: {},
  };

  const newSettings = object.children
    .map(item => {
      const schemaConverter = SCHEMA_Converters[item.type];
      if (schemaConverter) {
        const res = schemaConverter({
          // @ts-ignore
          field: item,
          parentField: object,
        });
        if (res) {
          const { locales, shopifyField } = res;
          RLocales = mergeDeepLeft(RLocales, locales as Locales);
          return shopifyField;
        }
        return undefined;
      }
      throw new Error('Có gì đó sai sai!');
    })
    .filter(item => !!item);

  return {
    locales: RLocales,
    shopifyField: flatten(newSettings as any),
  };
};

export const SETTING_SettingBlockObject = (object: SettingBlockObject, isPreview: boolean) => {
  type SettingResult = Record<string, string | number | boolean | undefined>;
  return object.children.reduce<SettingResult>((res, item) => {
    const settingConverter = SETTING_Converters[item.type];
    if (settingConverter) {
      return {
        ...res,
        ...(settingConverter(
          {
            // @ts-ignore
            field: item,
            parentField: object,
          },
          isPreview,
        ) as SettingResult),
      };
    }
    return res;
  }, {});
};

export const LIQUID_SettingBlockObject = (object: SettingBlockObject, liquid: string) => {
  return object.children.reduce<string>((res, item) => {
    const liquidConverter = LIQUID_Converters[item.type];
    if (liquidConverter) {
      return liquidConverter({
        // @ts-ignore
        field: item,
        parentField: object,
        liquid: res,
      });
    }
    return res;
  }, liquid);
};
