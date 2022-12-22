import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const validateCouponService = async ({ couponCode, planHandle }: { couponCode: string; planHandle: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    const response = await userApis.coupon.adminApi.validateCoupon({ couponCode, planHandle });
    return response;
  }
  if (role === 'user') {
    const response = await userApis.coupon.userApi.validateCoupon({ couponCode, planHandle });
    return response;
  }
  throw new RoleException();
};
