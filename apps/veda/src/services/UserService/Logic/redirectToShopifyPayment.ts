import { userApis } from '../apis';

export const redirectToShopifyPaymentService = async ({
  coupon,
  planHandle,
  returnUrl,
  yearly,
}: {
  coupon: string;
  planHandle: string;
  returnUrl: string;
  yearly: boolean;
}) => {
  const response = await userApis.plan.userApi.redirectToShopifyPayment({ coupon, planHandle, returnUrl, yearly });
  return response;
};
