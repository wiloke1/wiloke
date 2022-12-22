import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { ISCHEMA_SettingFlexOrder } from '../@types/ISCHEMA_SettingFlexOrder';
import { Option } from '../@types/SettingFlexOrder';

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const toShopifyFieldId = ({ field, parentField }: ISCHEMA_SettingFlexOrder, option: Option) => {
  const theoryShopifyFieldId = parentField ? `${parentField.name}___${field.name}__${option.name}` : `${field.name}__${option.name}`;
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
