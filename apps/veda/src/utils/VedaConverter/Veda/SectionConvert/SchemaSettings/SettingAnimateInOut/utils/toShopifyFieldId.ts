import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { ISCHEMA_SettingAnimateInOut } from '../@types/ISCHEMA_SettingAnimateInOut';
import { Key } from '../@types/SettingAnimateInOut';

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const toShopifyFieldId = ({ field, parentField }: ISCHEMA_SettingAnimateInOut, key: Key) => {
  const theoryShopifyFieldId = parentField ? `${parentField.name}___${field.name}__${key}` : `${field.name}__${key}`;
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
