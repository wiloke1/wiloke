import { AxiosResponse } from 'axios';
import { Coupon } from 'types/Coupon';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface ResponseSuccess {
  info: Coupon;
  message: string;
}

interface Params {
  couponCode: string;
  planHandle: string;
}

export const validateCoupon = async ({ couponCode, planHandle }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/validations/${couponCode}`,
    params: {
      couponCode,
      planHandle,
    },
  });
  return response.data;
};
