import { AxiosResponse } from 'axios';
import { ThemeShopify } from 'services/ThemeService/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getThemesShopify = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response: AxiosResponse<ThemeShopify[]> = await fetchAPI.request({
      url: `shopify-connections/admin/themes`,
    });
    return response.data;
  }
  const response: AxiosResponse<ThemeShopify[]> = await fetchAPI.request({
    url: `shopify-connections/me/themes`,
  });
  return response.data;
};
