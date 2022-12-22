import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { Localization } from 'utils/LiquidSyntaxToTwig';

interface GetLocalizationObjectResponse {
  localization: Localization;
}

interface BE_Response {
  localization: Localization;
}

export const getLocalizationObject = async (): Promise<GetLocalizationObjectResponse> => {
  if (configureApp.apiFake) {
    return {
      localization: null,
    };
  } else {
    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      url: `${configureApp.endpoint['shopify-connections']}/localization/static`,
      params: {
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });
    return response.data;
  }
};
