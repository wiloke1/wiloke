import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const getCouponService = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    const response = await userApis.coupon.adminApi.getCoupon({ commandId });
    return response;
  }
  throw new RoleException();
};
