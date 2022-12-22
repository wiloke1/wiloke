import { AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface GetThemeActive {}

interface ResponseSuccess {
  info: BE_ThemeClient;
  message: string;
}

export const getThemeActive = async ({}: GetThemeActive) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/publish`,
  });
  return response.data;
};
