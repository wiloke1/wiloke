import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SocketMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import fetchAPI from 'utils/functions/fetchAPI';

interface MigrateThemeShopify {
  newThemeId: string;
  eventId: string;
  eventType: Extract<SocketMessage['eventType'], 'Migrate theme'>;
}

export const migrateThemeShopify = async ({ newThemeId, eventId, eventType }: MigrateThemeShopify) => {
  const response: AxiosResponse<undefined> = await fetchAPI.request({
    url: `${configureApp.endpoint['shopify-connections']}/migration/${newThemeId}`,
    params: {
      eventId,
      eventType,
    },
  });
  return response.data;
};
