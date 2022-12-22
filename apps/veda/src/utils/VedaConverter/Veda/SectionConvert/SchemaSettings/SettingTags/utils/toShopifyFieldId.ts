import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { ISCHEMA_SettingTags } from '../@types/ISCHEMA_SettingTags';
import { ISETTING_SettingTags } from '../@types/ISETTING_SettingTags';

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const toShopifyFieldId = ({ field, parentField }: ISCHEMA_SettingTags | ISETTING_SettingTags) => {
  const theoryShopifyFieldId = parentField ? `${parentField.name}___${field.name}` : field.name;
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
