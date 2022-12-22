import { retry, SagaReturnType } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { PageType } from 'types/Page';

interface HandleGetDataRelateToShopify {
  pageCommandId: string;
  pageType: PageType;
}

const APPLY_ALL = 'all' as const;

export function* handleGetDataRelateToShopify({ pageCommandId, pageType }: HandleGetDataRelateToShopify) {
  const getShopifySlugs: SagaReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify> = yield retry(
    3,
    1000,
    shopifyConnectionService.getAdditionalDataRelateToShopify,
    { pageCommandId, defaultPageType: pageType },
  );

  return {
    shopifyPages: getShopifySlugs.info === undefined ? undefined : getShopifySlugs.info.isApplyToAll ? APPLY_ALL : getShopifySlugs.info.shopifyPages,
    shopifyRepresentPage: getShopifySlugs.info === undefined ? undefined : getShopifySlugs.info.shopifyRepresentPage,
  };
}
