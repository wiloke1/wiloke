import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface WriteAddonToShopify_BEExpectParameters {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  addonFiles: Array<{ js: string; css: string; id: string; liquid: string }>;
}

interface WriteAddonToShopify_BEResponse {
  message: string;
  info: Array<{
    assetKey: string;
    fileName: string;
    fileNameWithoutExtension: string;
    id: string;
  }>;
}

interface WriteAddonToShopify extends DeepPartial<WriteAddonToShopify_BEExpectParameters> {
  isPreview: boolean;
}

export const writeAddonToShopify = async (data: WriteAddonToShopify) => {
  if (areUndefined(data.eventId, data.eventType)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WriteAddonToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    params: {
      eventId: data.eventId,
      eventType: data.eventType,
    } as Pick<WriteAddonToShopify_BEExpectParameters, 'eventId' | 'eventType'>,
    data: data.addonFiles,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/addons`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/addons`,
  });
  return res.data.info;
};
