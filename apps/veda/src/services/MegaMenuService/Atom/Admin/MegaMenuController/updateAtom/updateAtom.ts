import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateAtom {
  /** Dữ liệu sẽ apply vào record */
  section: AdminSection;
}

interface ResponseSuccess {
  info: AdminSection;
  message: string;
}

/** API được sử dụng để "Admin" update "Section Atom" */
export const updateAtom = async ({ section }: UpdateAtom) => {
  const { commandId } = section;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: section,
  });

  return response.data;
};
