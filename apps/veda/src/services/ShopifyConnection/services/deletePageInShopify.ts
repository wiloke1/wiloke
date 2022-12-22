import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface DeletePageInShopify_BEExpectParameters {
  pageType: PageType;
  pageCommandId: string;
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
}

interface DeletePageInShopify_BEResponse {
  message: string;
}

/**
 * API sync khi xoá page shopify -> Xoá file liên quan, thay đổi trường template_suffix
 */
export const deletePageInShopify = async (data: DeepPartial<DeletePageInShopify_BEExpectParameters>) => {
  if (areUndefined(data.pageCommandId, data.pageType, data.eventId, data.eventType)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<DeletePageInShopify_BEResponse> = await fetchAPI.request({
    method: 'DELETE',
    params: data as DeletePageInShopify_BEExpectParameters,
    url: `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/pages/${data.pageCommandId}`,
  });
  return res.data.message;
};
