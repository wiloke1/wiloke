import { AxiosResponse } from 'axios';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageAtom } from '../../../types';

interface CreateAtom {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<Omit<BE_PageAtom, 'commandId'>>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageAtom;
}

/** API được sử dụng để "Admin" tạo page atom */
export const createAtom = async ({ page }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: page,
  });
  return response.data;
};
