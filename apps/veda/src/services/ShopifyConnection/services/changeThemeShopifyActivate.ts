import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';

interface ChangeThemeShopifyActivate {
  themeId: string;
}

export const changeThemeShopifyActivate = async ({ themeId }: ChangeThemeShopifyActivate) => {
  const response: AxiosResponse = await fetchAPI.request({
    method: 'PUT',
    url: `${configureApp.endpoint['shopify-connections']}/themes/${themeId}/activate`,
  });
  return response.data;
};
