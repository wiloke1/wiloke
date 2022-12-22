import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { getPathOfPage } from 'store/sagas/liquid/watchGetGlobalObjectFake';
import { Page as PageOfBuilder } from 'types/Page';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import getPageInfo from 'utils/functions/getInfo';
import { getShopName } from 'utils/functions/getUserInfo';
import { Page } from 'utils/LiquidSyntaxToTwig';

type GetPagesObject = Pick<PageOfBuilder, 'label' | 'shopifyRepresentPage' | 'type'> & {
  slugs: string[];
};

type GetPagesObjectResponse = Record<string, Page>;

const FAKE_NUMBER_ID = Math.random();
const FAKE_DATE = new Date(Date.now()).toString();

export const getPagesObject = async ({ label, shopifyRepresentPage, type, slugs }: GetPagesObject): Promise<GetPagesObjectResponse> => {
  const handle = shopifyRepresentPage?.handle;
  if (!handle || !slugs.length) {
    return {};
  }
  const pageDefault: Record<string, Page> = {
    [handle]: {
      author: 'Author',
      handle,
      id: FAKE_NUMBER_ID,
      pushlished_at: FAKE_DATE,
      template_suffix: label,
      title: label,
      url: `${getPageInfo('shop', window.location.search)}/${getPathOfPage({ type, handle })}`,
      metafields: null,
      content: null,
    },
  };
  if (configureApp.apiFake) {
    return pageDefault;
  } else {
    try {
      interface Response {
        pages: Page[];
      }
      const response: AxiosResponse<Response> = await fetchAPI.request({
        baseURL: '',
        url: `${configureApp.endpoint['shopify-connections']}/pages/static`,
        params: {
          shopName: getShopName(),
          version: getCurrentVersion(),
          handles: handle,
        },
      });
      // Nếu không có page chứng tỏ đang tạo page mới
      if (!response.data.pages.length) {
        return pageDefault;
      }
      return response.data.pages.reduce<Record<string, Page>>((res, page) => {
        if (page && page.handle) {
          return { ...res, [page.handle]: page };
        }
        return res;
      }, {});
    } catch (err) {
      return pageDefault;
    }
  }
};
