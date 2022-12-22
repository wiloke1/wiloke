import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { mergeDeepLeft } from 'ramda';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';

interface GetTranslationObject {
  locale: string;
  themeId: number;
}

type GetTranslationObjectResponse = Record<string, string | any>;

interface BE_Response {
  data: string;
}

export const getTranslationObject = async ({ locale, themeId }: GetTranslationObject): Promise<GetTranslationObjectResponse> => {
  if (!locale) {
    return {};
  }
  if (configureApp.apiFake) {
    return {};
  } else {
    try {
      const defaultFileContent: Record<string, string | any> = await fetchAPI
        .request({
          url: `${configureApp.endpoint['shopify-connections']}/locale/${themeId}/static`,
          params: {
            shopName: getShopName(),
            version: getCurrentVersion(),
            assetKey: `locales/${locale}.default.json`,
          },
        })
        .then(response => {
          const _response = response as AxiosResponse<BE_Response>;
          return JSON.parse(_response.data.data);
        })
        .catch(() => {
          return {};
        });
      const otherFileContent: Record<string, string | any> = await fetchAPI
        .request({
          url: `${configureApp.endpoint['shopify-connections']}/locale/${themeId}/static`,
          params: {
            shopName: getShopName(),
            version: getCurrentVersion(),
            assetKey: `locales/${locale}.json`,
          },
        })
        .then(response => {
          const _response = response as AxiosResponse<BE_Response>;
          return JSON.parse(_response.data.data);
        })
        .catch(() => {
          return {};
        });
      return mergeDeepLeft(defaultFileContent, otherFileContent);
    } catch (err) {
      throw err;
    }
  }
};
