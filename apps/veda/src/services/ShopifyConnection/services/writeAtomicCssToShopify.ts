import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface WriteAtomicCssToShopify_BEExpectParameters {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  rawAtomic: string;
}

interface WriteAtomicCssToShopify_BEResponse {
  message: string;
  info: {
    eventId: string;
    eventType: SyncShopifyMessage['eventType'];
  };
}

interface WriteAtomicCssToShopify extends DeepPartial<WriteAtomicCssToShopify_BEExpectParameters> {
  isPreview: boolean;
}

export const writeAtomicCssToShopify = async (data: WriteAtomicCssToShopify) => {
  if (areUndefined(data.eventId, data.eventType)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WriteAtomicCssToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    params: {
      eventId: data.eventId,
      eventType: data.eventType,
    } as Pick<WriteAtomicCssToShopify_BEExpectParameters, 'eventId' | 'eventType'>,
    data: {
      ...data,
      rawAtomic: `
        /** ${new Date().toLocaleString('en-US')} */
        ${data.rawAtomic ?? ''}
      `,
    } as WriteAtomicCssToShopify_BEExpectParameters,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/atomic`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/atomic`,
  });
  return res.data.message;
};
