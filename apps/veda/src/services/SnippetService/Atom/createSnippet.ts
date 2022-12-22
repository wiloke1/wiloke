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

export const createSnippet = async ({ data, fileName, keyword, label }: DataBody) => {
  const response: AxiosResponse<CreateUpdateSnippetResponse> = await fetchAPI.request({
    url: baseUrl,
    method: 'POST',
    data: {
      data,
      fileName,
      keyword,
      label,
    },
  });

  return response.data;
};
