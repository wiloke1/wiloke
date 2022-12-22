import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ForkAtom {
  parentCommandId: string;
}

interface ResponseSuccess {
  info: DevSection;
  message: string;
}

export const forkAtom = async ({ parentCommandId }: ForkAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/forks/${parentCommandId}`,
    method: 'POST',
  });
  return response.data;
};
