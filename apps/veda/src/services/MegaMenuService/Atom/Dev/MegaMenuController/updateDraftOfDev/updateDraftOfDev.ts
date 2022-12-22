import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ apply vào record */
  section: DevSection;
}

interface ResponseSuccess {
  message: string;
  info: DevSection;
}

/** API được sử dụng để update "Section draft của Dev" */
export const updateDraftOfDev = async ({ section }: UpdateDraftOfDev) => {
  const { commandId } = section;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: {
      ...section,
    },
  });
  return response.data;
};
