import { AxiosResponse } from 'axios';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';

interface BE_Response {
  message: string;
  info: {
    id: number;
    role: string;
    name: string;
  };
}

export const getThemeObject = async () => {
  const response: AxiosResponse<BE_Response> = await fetchAPI.request({
    url: 'shopify-connections/admin-themes/active',
    params: {
      shopName: getShopName(),
      version: getCurrentVersion(),
    },
  });
  return { theme: response.data.info };
};
