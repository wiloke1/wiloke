import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetUsers {
  page: number;
  role?: string;
}
interface Pageable {
  sort: {
    shorted: true;
    unsorted: true;
    empty: true;
  };
  numberOfElements: number;
  number: number;
  size: number;
  totalPages: number;
}

interface ResponseSuccess extends Pageable {
  info: {
    content: Array<{
      id: number;
      username: string;
      name: string;
      phone: string;
      email: string;
      status: string;
      password: string;
      shopName: string;
      shopStatus: string;
      themeName: string;
      themeId: string;
      previousThemeId: string;
      profileUrl: string;
      createdDateGMT: string;
      updatedDateGMT: string;
      roles: Array<{
        id: number;
        name: string;
      }>;
    }>;
    pageable: Pageable;
  };
  message: string;
}

export const getUsers = async ({ page, role }: GetUsers) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    params: {
      page,
      role,
    },
  });
  return response.data;
};
