import { AxiosResponse } from 'axios';
import { Coupon } from 'types/Coupon';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface ResponseSuccess {
  info: Coupon;
  message: string;
}

interface Params {
  commandId: string;
}

export const getCoupon = async ({ commandId }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
