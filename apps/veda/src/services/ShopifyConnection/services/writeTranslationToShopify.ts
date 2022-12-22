import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SyncShopifyMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { i18n } from 'translation';
import fetchAPI from 'utils/functions/fetchAPI';
import { areUndefined } from '../utils';
export interface WriteTranslation_BEExpectParameters {
  eventId: string;
  eventType: SyncShopifyMessage['eventType'];
  lang: string;
  translation: string;
}

export interface WriteTranslation_BEResponse {}

interface WriteTranslation extends DeepPartial<WriteTranslation_BEExpectParameters> {
  isPreview: boolean;
}

export const writeTranslation = async ({ eventId, eventType, lang, translation, isPreview }: WriteTranslation) => {
  if (areUndefined(eventId, eventType, lang, translation)) {
    throw new Error(i18n.t('general.lack_of_params'));
  }
  const response: AxiosResponse<WriteTranslation_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    url: isPreview
      ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/preview/me/locales`
      : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/locales`,
    data: {
      eventId,
      eventType,
      lang,
      translation,
    } as WriteTranslation_BEExpectParameters,
    params: {
      eventId,
      eventType,
    },
  });
  return response.data;
};
