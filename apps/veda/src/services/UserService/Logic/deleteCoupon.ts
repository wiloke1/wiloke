import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const deleteCouponService = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await userApis.coupon.adminApi.deleteCoupon({ commandId });
    return response;
  }
  throw new RoleException();
};
