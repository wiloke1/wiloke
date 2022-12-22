import { PageResponse } from 'services/ResultService';
import { PageLiquidVariable, PageType } from 'types/Page';

export interface GetPageBuilderItemsResponse {
  info: PageResponse[];
  message: string;
}

export interface GetTemplatePagesResponse {
  info: PageResponse[];
  message: string;
}

export interface ServerTemplateResponse {
  image: {
    src: string;
    width: number;
    height: number;
  };
  label: string;
  saved?: boolean;
  /** mô tả của template */
  description?: string;
  /** mô tả dạng html của template */
  html?: string;
  commandId: string;
  type: PageType;
  /** bắn sang cho Tưởng request lấy liquid variables */
  shopifyRepresentPage?: PageLiquidVariable;
  parentCommandId: string;
  /** Lưu các id và handle của product, blog, collection của shopify */
  shopifyPages?: PageLiquidVariable[] | 'all';
}
