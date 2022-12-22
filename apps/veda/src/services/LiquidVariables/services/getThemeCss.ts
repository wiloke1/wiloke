import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';

interface GetThemeCss {
  themeId: number;
}

interface GetThemeCssResponse {
  url: string;
}

interface BE_Response {
  urlThemeCssGlobal: string;
}

export const getThemeCss = async ({ themeId }: GetThemeCss): Promise<GetThemeCssResponse> => {
  if (configureApp.apiFake) {
    return { url: '' };
  } else {
    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      baseURL: '',
      url: `${configureApp.endpoint['shopify-connections']}/theme-assets/${themeId}`,
      params: {
        shopName: getShopName(),
      },
    });
    return {
      url: response.data.urlThemeCssGlobal,
    };
  }
};
