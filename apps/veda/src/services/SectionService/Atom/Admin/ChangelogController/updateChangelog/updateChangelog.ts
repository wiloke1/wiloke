import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import { GetRequired } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateChangelog {
  /** Dữ liệu sẽ được apply vào record */
  changelog: GetRequired<SectionChangelog>;
}

interface ResponseSuccess {
  info: SectionChangelog;
  message: string;
}

/** API được sử dụng để update 1 changelog */
export const updateChangelog = async ({ changelog }: UpdateChangelog) => {
  const { commandId } = changelog;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: changelog,
  });

  return response.data;
};
