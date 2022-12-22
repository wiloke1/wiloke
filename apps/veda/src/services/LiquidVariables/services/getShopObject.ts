import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { Shop } from 'utils/LiquidSyntaxToTwig';

type GetShopObjectResponse = Shop & { weight_unit: string };

interface BE_Response {
  shop: Shop & { weight_unit: string };
}

export const getShopObject = async (): Promise<GetShopObjectResponse> => {
  if (configureApp.apiFake) {
    return { weight_unit: 'kg' } as GetShopObjectResponse;
  } else {
    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      baseURL: '',
      url: `${configureApp.endpoint['shopify-connections']}/shop`,
      params: {
        shopName: getShopName(),
      },
    });
    return response.data.shop;
  }
};
