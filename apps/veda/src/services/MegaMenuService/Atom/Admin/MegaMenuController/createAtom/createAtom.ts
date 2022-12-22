import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAtom {
  /** Dữ liệu sẽ được apply vào record */
  section: Omit<AdminSection, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: AdminSection;
}

/** API được dùng để "Admin" tạo "Section Atom" */
export const createAtom = async ({ section }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: section,
  });

  return response.data;
};
