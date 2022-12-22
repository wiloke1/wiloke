import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { DeleteSnippetResponse } from '../type';
import { baseUrl } from './const';

interface Params {
  fileName: string;
}

export const deleteSnippet = async ({ fileName }: Params) => {
  const response: AxiosResponse<DeleteSnippetResponse> = await fetchAPI.request({
    url: `${baseUrl}/${fileName}`,
    method: 'DELETE',
  });

  return response.data;
};
