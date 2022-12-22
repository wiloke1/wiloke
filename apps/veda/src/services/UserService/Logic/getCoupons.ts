import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const getCouponsService = async () => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    const response = await userApis.coupon.adminApi.getCoupons();
    return response;
  }
  throw new RoleException();
};
