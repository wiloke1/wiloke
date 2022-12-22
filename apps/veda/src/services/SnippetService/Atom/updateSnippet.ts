import { AxiosResponse } from 'axios';
import { SnippetContent } from 'store/global/globalSnippets/sliceGlobalSnippets';
import fetchAPI from 'utils/functions/fetchAPI';
import { CreateUpdateSnippetResponse } from '../type';
import { baseUrl } from './const';

interface DataBody {
  label?: string;
  keyword?: string[];
  fileName: string;
  data: SnippetContent;
}

export const updateSnippet = async ({ data, fileName, keyword, label }: DataBody) => {
  const response: AxiosResponse<CreateUpdateSnippetResponse> = await fetchAPI.request({
    url: `${baseUrl}/${fileName}/data`,
    method: 'PUT',
    data: {
      data,
      keyword,
      label,
    },
  });

  return response.data;
};
