import { AxiosError, AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { PageLiquidVariable, PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import customLog from 'utils/functions/log';
import { ErrorData } from 'utils/NotifyAxiosHandler';

interface GetAdditionalDataRelateToShopify_BEExpectParameters {
  pageCommandId: string;
  defaultPageType?: PageType;
}

export interface GetAdditionalDataRelateToShopify_BEExpectResponse {
  message: string;
  info: {
    commandId: string;
    isApplyToAll?: boolean;
    isIncludeHeaderFooter?: boolean;
    isPublished?: boolean;
    isOverrideIndividualPages?: boolean | undefined;
    pageCommandId?: string;
    shopifyPageType?: PageType;
    shopifyPages?: PageLiquidVariable[];
    shopifyRepresentPage?: PageLiquidVariable;
    userId?: number;
    blogHandle?: string;
    blogId?: number;
  };
}

/** Lấy các thông tin liên quan đến shopify và "đầu ra của builder" (shopifyPages, shopifyRepresentPage, isPublished, ...) */
export const getAdditionalDataRelateToShopify = async (data: DeepPartial<GetAdditionalDataRelateToShopify_BEExpectParameters>) => {
  try {
    const res: AxiosResponse<GetAdditionalDataRelateToShopify_BEExpectResponse> = await fetchAPI.request({
      method: 'GET',
      params: data as GetAdditionalDataRelateToShopify_BEExpectParameters,
      url: `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/pages/${data.pageCommandId}`,
    });

    const customResponse: GetAdditionalDataRelateToShopify_BEExpectResponse = {
      info:
        res.data.info === undefined || res.data.info.userId === 0
          ? { commandId: data.pageCommandId ?? '', shopifyRepresentPage: res.data.info.shopifyRepresentPage ?? undefined }
          : {
              ...res.data.info,
              ...(res.data.info.shopifyPageType === 'article'
                ? {
                    shopifyRepresentPage: {
                      ...res.data.info.shopifyRepresentPage,
                      blogId: res.data.info.blogId,
                    } as PageLiquidVariable,
                  }
                : undefined),
            },
      message: res.data.message,
    };

    return customResponse;
  } catch (error) {
    customLog('getAdditionalDataRelateToShopify', error);
    return {
      info: { commandId: data.pageCommandId ?? '' },
      message: (error as AxiosError<ErrorData>).message,
    } as GetAdditionalDataRelateToShopify_BEExpectResponse;
  }
};
