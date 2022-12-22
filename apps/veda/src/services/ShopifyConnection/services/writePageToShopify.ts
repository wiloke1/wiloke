import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';
import { ArticlePage, File, HomePage, Product_Collection_Page, RegularPage } from './.types';

export interface WritePageToShopify_BEExpectParameters {
  pageCommandId: string;
  assets: {
    files: File[];
  };
  product: Product_Collection_Page;
  collection: Product_Collection_Page;
  article: ArticlePage;
  page: RegularPage;
  home: HomePage;
  pageType: PageType;
  pageName: string;
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  isIncludeThemeHeaderFooter: boolean; // Nếu không bắn lên BE sẽ set mặc định là true nên cần set cái này vào để giữ nguyên trạng thái nên trường này là bắt buộc phải bắn lên
}
interface WritePageToShopify_BEResponse {
  message: string;
  info: {
    eventId: string;
    eventType: SyncShopifyMessage['eventType'];
  };
}

interface WritePageToShopify extends DeepPartial<WritePageToShopify_BEExpectParameters> {
  isPreview: boolean;
}

/** API sync liquid, js, css, ... của các "sections" trong "page" lên shopify (1 Page) */
export const writePageToShopify = async (data: WritePageToShopify) => {
  if (areUndefined(data.eventId, data.eventType, data.pageCommandId, data.pageType, data.pageName, data.pageName, data.assets?.files)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WritePageToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    params: {
      pageCommandId: data.pageCommandId,
    } as Pick<WritePageToShopify_BEExpectParameters, 'pageCommandId'>,
    data: data as WritePageToShopify_BEExpectParameters,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/pages/${data.pageCommandId}`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/pages/${data.pageCommandId}`,
  });
  return res.data.message;
};
