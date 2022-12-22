import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';

interface Params {
  planHandle: string;
  /** url hiện tại ở trên thanh bar */
  returnUrl: string;
  coupon: string;
  yearly: boolean;
}

interface ResponseSuccess {
  info: {
    confirmation_url: string;
  };
  message: string;
  status: string;
}

export const redirectToShopifyPayment = async ({ coupon, planHandle, returnUrl, yearly }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `clients/me/charges`,
    method: 'POST',
    data: {
      coupon: coupon === '' ? undefined : coupon,
      planHandle,
      returnUrl,
      yearly,
    },
  });

  return response.data;
};
