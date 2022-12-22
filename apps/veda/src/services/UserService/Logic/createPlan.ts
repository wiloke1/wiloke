import { UserPlan } from 'types/Plan';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const createPlanService = async (params: Omit<UserPlan, 'commandId'>) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return userApis.plan.adminApi.createPlan(params);
  }

  throw new RoleException();
};
