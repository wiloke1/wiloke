import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import { GetRequired } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateChangelog {
  /** Dữ liệu sẽ apply vào record */
  changelog: Omit<GetRequired<SectionChangelog>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: SectionChangelog;
}

/** API cho phép "Admin" tạo changelog cho 1 addon */
export const createChangelog = async ({ changelog }: CreateChangelog) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: changelog,
  });
  return response.data;
};
