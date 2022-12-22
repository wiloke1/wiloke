import { HeaderField } from '../../../../Shopify/SidebarSettings/HeaderField';
import { Locales } from '../../../@types/ShopifyLocales';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { ISCHEMA_SettingDivider } from './@types/ISCHEMA_SettingDivider';
import { ISETTING_SettingDivider } from './@types/ISETTING_SettingDivider';
import { ILIQUID_SettingDivider } from './@types/ILIQUID_SettingDivider';

interface RTSettingDivider {
  shopifyField: HeaderField;
  locales: Locales;
}

export const SCHEMA_SettingDivider = ({ field, ...params }: ISCHEMA_SettingDivider): RTSettingDivider => {
  const { newLabel, locales: labelLocales } = vedaLabelToShopifyFieldLabel({ field, ...params });
  return {
    shopifyField: {
      type: 'header',
      content: newLabel,
    },
    locales: labelLocales,
  };
};

export const SETTING_SettingDivider = (_: ISETTING_SettingDivider) => {
  return {};
};

export const LIQUID_SettingDivider = ({ liquid }: ILIQUID_SettingDivider) => liquid;
