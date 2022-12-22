import { AxiosResponse } from 'axios';
import { ProductTheme } from 'types/Theme';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateTag {
  /** Dữ liệu được apply vào record */
  tag: Omit<Exclude<ProductTheme['tags'], undefined>[number], 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductTheme['tags'], undefined>[number];
}

/** API được sử dụng để "Admin" tạo tag cho theme trên production */
export const createTag = async ({ tag }: CreateTag) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: tag,
  });
  return response.data;
};
