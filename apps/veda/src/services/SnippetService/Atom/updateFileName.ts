import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { CreateUpdateSnippetResponse } from '../type';
import { baseUrl } from './const';

interface DataBody {
  oldFileName: string;
  newFileName: string;
}

export const updateSnippetFileName = async ({ oldFileName, newFileName }: DataBody) => {
  const response: AxiosResponse<CreateUpdateSnippetResponse> = await fetchAPI.request({
    url: `${baseUrl}/${oldFileName}/rename`,
    method: 'PUT',
    data: {
      fileName: newFileName,
    },
  });

  return response.data;
};
