import { ParagraphField } from '../../../../Shopify/SidebarSettings/ParagraphField';
import { Locales } from '../../../@types/ShopifyLocales';
import { ILIQUID_SettingTextReadOnly } from './@types/ILIQUID_SettingTextReadOnly';
import { ISCHEMA_SettingTextReadOnly } from './@types/ISCHEMA_SettingTextReadOnly';
import { ISETTING_SettingTextReadOnly } from './@types/ISETTING_SettingTextReadOnly';

interface RTSettingTextReadOnly {
  shopifyField: ParagraphField;
  locales: Locales;
}

export const SCHEMA_SettingTextReadOnly = ({ field }: ISCHEMA_SettingTextReadOnly): RTSettingTextReadOnly => {
  return {
    shopifyField: {
      type: 'paragraph',
      content: field.children,
    },
    locales: {
      en: {},
      fr: {},
      vi: {},
    },
  };
};

export const SETTING_SettingTextReadOnly = (_: ISETTING_SettingTextReadOnly) => {
  return {};
};

export const LIQUID_SettingTextReadOnly = ({ liquid }: ILIQUID_SettingTextReadOnly) => liquid;
