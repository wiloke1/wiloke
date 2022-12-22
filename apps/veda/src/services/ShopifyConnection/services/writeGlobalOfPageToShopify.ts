import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';
import { ArticlePage, File, HomePage, Product_Collection_Page, RegularPage } from './.types';

export interface WriteGlobalOfPageToShopify_BEExpectParameters {
  assets: {
    files: File[];
  };
  product: Product_Collection_Page;
  collection: Product_Collection_Page;
  article: ArticlePage;
  page: RegularPage;
  home: HomePage;
  pageCommandId: string;
  pageType: PageType;
  pageName: string;
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  isIncludeThemeHeaderFooter: boolean;
}

interface WriteGlobalOfPageToShopify_BEResponse {
  message: string;
  info: {
    eventId: string;
    eventType: SyncShopifyMessage['eventType'];
  };
}

interface WriteGlobalOfPageToShopify extends DeepPartial<WriteGlobalOfPageToShopify_BEExpectParameters> {
  isPreview: boolean;
}

/** API sync js, css, SEO, ... được sinh ra từ "page settings lên shopify */
export const writeGlobalOfPageToShopify = async (data: WriteGlobalOfPageToShopify) => {
  if (areUndefined(data.eventId, data.eventType, data.assets, data.pageCommandId)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WriteGlobalOfPageToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    params: {
      pageCommandId: data.pageCommandId,
    } as Pick<WriteGlobalOfPageToShopify_BEExpectParameters, 'pageCommandId'>,
    data: data as WriteGlobalOfPageToShopify_BEExpectParameters,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/pages/${data.pageCommandId}/global`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/pages/${data.pageCommandId}/global`,
  });
  return res.data.message;
};
