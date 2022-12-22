import { UserPlan } from 'types/Plan';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const updatePlanService = async (params: UserPlan) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return userApis.plan.adminApi.updatePlan(params);
  }

  throw new RoleException();
};
