import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { ISCHEMA_SettingResponsive } from '../@types/ISCHEMA_SettingResponsive';
import { ResponsiveValue } from '../@types/SettingResponsive';

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const toShopifyFieldId = ({ field, parentField }: ISCHEMA_SettingResponsive, breakpoint: keyof ResponsiveValue) => {
  const theoryShopifyFieldId = parentField ? `${parentField.name}___${field.name}__${breakpoint}` : `${field.name}__${breakpoint}`;
  if (theoryShopifyFieldId.length >= 25) {
    const valueInCache = cacheKey.get(theoryShopifyFieldId);
    if (valueInCache) {
      return valueInCache;
    } else {
      const newKey = randomShopifyFieldId();
      cacheKey.set(theoryShopifyFieldId, newKey);
      return newKey;
    }
  }
  return theoryShopifyFieldId;
};
