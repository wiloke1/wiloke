import { PageLiquidVariable } from 'types/Page';

export const isShopifyEntityNonExisted = (shopifyRepresentPage: PageLiquidVariable) => {
  return shopifyRepresentPage?.handle === 'unknown-handle';
};
