import { AxiosResponse } from 'axios';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageAtom } from '../../../types';

interface UpdateAtom {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<BE_PageAtom>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type' | 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageAtom;
}

/** API được sử dụng để "Admin" update page atom */
export const updateAtom = async ({ page }: UpdateAtom) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
