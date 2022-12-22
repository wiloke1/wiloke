import { randomShopifyFieldId } from 'utils/VedaConverter/Veda/utils/randomShopifyFieldId';
import { ISCHEMA_SettingSlider } from '../@types/ISCHEMA_SettingSlider';
import { ISETTING_SettingSlider } from '../@types/ISETTING_SettingSlider';

// shopify field id được sử dụng tại "Shopify Settings" và "Shopfiy Liquid" nên cần cacheKey
const cacheKey: Map<string, string> = new Map();
export const toShopifyFieldId = ({ field, parentField }: ISCHEMA_SettingSlider | ISETTING_SettingSlider) => {
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
