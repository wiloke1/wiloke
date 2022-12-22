import { AxiosResponse } from 'axios';
import configApp from 'configureApp';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { getEndpointRole } from 'utils/functions/getUserInfo';

export default class ResultService {
  async checkExistSlugPage({ commandId, handle, pageType }: { handle: string; commandId: string; pageType: PageType }) {
    interface Response {
      message: string;
    }

    const response: AxiosResponse<Response> = await fetchAPI.request({
      method: 'get',
      url: `${configApp.endpoint['shopify-connections']}/sync/shopify/${getEndpointRole()}/validators`,
      params: {
        pageCommandId: commandId,
        handle,
        pageType,
      },
    });

    return response;
  }
}
