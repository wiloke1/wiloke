import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateDraftOfDev {
  /** Dữ liệu sẽ được apply vào record */
  section: Omit<DevSection, 'commandId' | 'parentCommandId'>;
}

interface ResponseSuccess {
  info: DevSection;
  message: string;
}

/** API được sử dụng để "Dev" tạo "Section Draft" */
export const createDraftOfDev = async ({ section }: CreateDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: section,
  });
  return response.data;
};
