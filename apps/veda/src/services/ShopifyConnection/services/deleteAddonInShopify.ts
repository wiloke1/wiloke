import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface DeleteAddonInShopify_BEExpectParameters {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  addonIds: Array<{ id: string }>;
}

interface DeleteAddonInShopify_BEResponse {
  message: string;
  info: [];
}

interface DeleteAddonInShopify extends DeepPartial<DeleteAddonInShopify_BEExpectParameters> {
  isPreview: boolean;
}

export const deleteAddonInShopify = async (data: DeleteAddonInShopify) => {
  if (areUndefined(data.eventId, data.eventType)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<DeleteAddonInShopify_BEResponse> = await fetchAPI.request({
    method: 'DELETE',
    params: {
      eventId: data.eventId,
      eventType: data.eventType,
    } as Pick<DeleteAddonInShopify_BEExpectParameters, 'eventId' | 'eventType'>,
    data: data.addonIds,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/addons`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/addons`,
  });
  return res.data.info;
};
