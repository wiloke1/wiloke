import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const getCampaignService = async () => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    const response = await userApis.coupon.adminApi.getCampaign();
    return response;
  }
  if (role === 'user') {
    const response = await userApis.coupon.userApi.getCampaign();
    return response;
  }
  throw new RoleException();
};
