import { CU_Coupon } from 'types/Coupon';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const createCouponService = async (params: CU_Coupon) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await userApis.coupon.adminApi.createCoupon({
      ...params,
      commandId: '',
    });
    return response;
  }
  throw new RoleException();
};
