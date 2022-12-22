import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

interface UpdateAddonsDisablePositionToShopify_BEExpectParams {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  content: string;
  themeName: string;
}

interface UpdateAddonsDisablePositionToShopify_Response {
  message: string;
}

interface UpdateAddonsDisablePositionToShopify extends DeepPartial<UpdateAddonsDisablePositionToShopify_BEExpectParams> {
  isPreview: boolean;
}

export const updateAddonsDisablePositionToShopify = async (data: UpdateAddonsDisablePositionToShopify) => {
  if (areUndefined(data.eventId, data.eventType)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<UpdateAddonsDisablePositionToShopify_Response> = await fetchAPI.request({
    method: 'PUT',
    params: {
      eventId: data.eventId,
      eventType: data.eventType,
    } as Pick<UpdateAddonsDisablePositionToShopify_BEExpectParams, 'eventId' | 'eventType'>,
    data: data as UpdateAddonsDisablePositionToShopify_BEExpectParams,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/no-placement-addons`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/no-placement-addons`,
  });
  return res.data.message;
};
