import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetChangelogsOfAtom {
  /** CommandId của section atom */
  parentCommandId: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của 1 section với role là dev */
export const getChangelogsOfParentProduct = async ({ parentCommandId }: GetChangelogsOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/parent-sections/${parentCommandId}`,
  });

  return response.data;
};
