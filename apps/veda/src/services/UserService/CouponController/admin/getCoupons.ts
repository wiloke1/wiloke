import { AxiosResponse } from 'axios';
import { Coupon } from 'types/Coupon';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface ResponseSuccess {
  info: Coupon[];
  message: string;
}

export const getCoupons = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: baseUrl,
  });
  return response.data;
};
