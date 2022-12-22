import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';

interface UpdatePageStatus_BEExpectParams {
  pageCommandId: string;
}

interface UpdatePageStatus_BEResponse {
  message: string;
}

export const updatePageStatus = async ({ pageCommandId }: UpdatePageStatus_BEExpectParams) => {
  const res: AxiosResponse<UpdatePageStatus_BEResponse> = await fetchAPI.request({
    method: 'PUT',
    data: { pageCommandId } as UpdatePageStatus_BEExpectParams,
    url: `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/pages/${pageCommandId}/status`,
  });

  return res.data.message;
};
