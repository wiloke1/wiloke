import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateTag {
  /** Dữ liệu được apply vào record */
  tag: Exclude<ProductPage['tags'], undefined>[number];
}

interface ResponseSuccess {
  message: string;
  tag: Exclude<ProductPage['tags'], undefined>[number];
}

/** API được sử dụng để "Admin" update tag của page trên production */
export const updateTag = async ({ tag }: UpdateTag) => {
  const { commandId } = tag;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: tag,
  });
  return response.data;
};
