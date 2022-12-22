import { AxiosResponse } from 'axios';
import { BE_ThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAtom {
  /** Dữ liệu sẽ apply vào record */
  theme: Omit<BE_ThemeAtom, 'commandId' | 'createdDateTimestamp' | 'modifiedDateTimestamp' | 'approvedBy' | 'parentCommandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeAtom;
}

/** API được sử dụng để "Admin" tự tạo theme atom */
export const createAtom = async ({ theme }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: theme,
  });
  return response.data;
};
