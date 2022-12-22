import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface WriteHeaderFooterToShopify_BEExpectParameters {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  header: string;
  footer: string;
  themeName: string;
}

interface WriteHeaderFooterToShopify_BEResponse {
  message: string;
  info: {
    eventId: string;
    eventType: SyncShopifyMessage['eventType'];
  };
}

interface WriteHeaderFooterToShopify extends DeepPartial<WriteHeaderFooterToShopify_BEExpectParameters> {
  isPreview: boolean;
}

/**
 * Services thực hiện ghi header, footer vào shopify
 * - Ghi liquid, css, js
 */
export const writeHeaderFooterToShopify = async (data: WriteHeaderFooterToShopify) => {
  if (areUndefined(data.eventId, data.eventType, data.themeName, data.header, data.footer)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WriteHeaderFooterToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    params: {
      eventId: data.eventId,
      eventType: data.eventType,
    } as Pick<WriteHeaderFooterToShopify_BEExpectParameters, 'eventId' | 'eventType'>,
    data: data as WriteHeaderFooterToShopify_BEExpectParameters,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/themes/header-footer`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/themes/header-footer`,
  });
  return res.data.message;
};
