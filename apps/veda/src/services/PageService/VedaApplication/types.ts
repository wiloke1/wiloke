import { GetAdditionalDataRelateToShopify_BEExpectResponse } from 'services/ShopifyConnection';
import { PageLiquidVariable, PageType, Plan, PreviewImage } from 'types/Page';
import { PageSettings } from 'types/Result';

export interface BE_PageProduct {
  commandId: string;
  parentCommandId: string;
  label: string;
  type: PageType;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  category?: {
    name: string;
    commandId: string;
    description?: string;
  };
  hitCache: boolean;
  createdDateGMT: string;
  downloadedCount: number;
  plan: Plan;
  modifiedDateGMT: string;
  saved?: boolean;
  createdDateTimestamp: number;
  modifiedDateTimestamp: number;
}

export interface BE_PageClient {
  commandId: string;
  parentCommandId?: string;
  label: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  userId?: number;
  sectionCommandIds: string[];
  type: PageType;
  pageSettings?: PageSettings;
  enable: boolean;
  createdDateTimestamp?: number;
  modifiedDateTimestamp?: number;
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'] /** bắn sang cho Tưởng request lấy liquid variables */;
  shopifyRepresentPage?: PageLiquidVariable;
  /** Lưu các id và handle của product, blog, collection của shopify */
  shopifyPages?: PageLiquidVariable[] | 'all';
  justDisabledPages?: string[];
}

export interface RequestGetPagesClient {
  pageType?: PageType;
  label?: string;
  enable?: boolean;
}

export interface PageFavoriteDataResponse {
  categories: string[];
  commandId: string;
  favoriteType: string;
  image: PreviewImage;
  name: string;
  parentCommandId: string;
  userId: number;
  pageType: PageType;
}
