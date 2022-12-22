import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';

export interface WriteGlobalOfThemeToShopify_BEExpectParameters {
  content: string;
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
}

interface WriteGlobalOfThemeToShopify_BEResponse {
  message: string;
  info: {
    eventId: string;
    eventType: SyncShopifyMessage['eventType'];
  };
}

interface WriteGlobalOfThemeToShopify extends DeepPartial<WriteGlobalOfThemeToShopify_BEExpectParameters> {
  isPreview: boolean;
}

/** API sync js, css, ... - được sinh ra từ "theme settings - lên shopify */
export const writeGlobalOfThemeToShopify = async (data: WriteGlobalOfThemeToShopify) => {
  if (areUndefined(data.eventId, data.eventType, data.content)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const res: AxiosResponse<WriteGlobalOfThemeToShopify_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    data: data as WriteGlobalOfThemeToShopify_BEExpectParameters,
    url: data.isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/themes/snippets`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/themes/snippets`,
  });
  return res.data.message;
};
