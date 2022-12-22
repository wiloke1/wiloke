import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const getPlansService = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return userApis.plan.adminApi.getPlans();
  } else {
    return userApis.plan.userApi.getPlans();
  }
};
