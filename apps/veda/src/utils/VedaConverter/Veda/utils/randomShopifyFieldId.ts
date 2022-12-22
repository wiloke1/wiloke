import { v4 } from 'uuid';

export const randomShopifyFieldId = () => {
  const uniqId = v4()
    .substring(0, 18)
    .replace(/-/g, '_');
  return `VEDA_${uniqId}`;
};
