import { AxiosResponse } from 'axios';
import { Coupon, CU_Coupon } from 'types/Coupon';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';
interface Params extends CU_Coupon {}

interface ResponseSuccess {
  info: Coupon;
  message: string;
}

export const updateCoupon = async (params: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${params.commandId}`,
    method: 'PUT',
    data: {
      ...params,
    },
  });

  return response.data;
};
