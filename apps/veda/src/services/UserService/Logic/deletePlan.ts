import { UserPlan } from 'types/Plan';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

import { userApis } from '../apis';

export const deletePlanService = async ({ commandId }: { commandId: UserPlan['commandId'] }) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return userApis.plan.adminApi.deletePlan({ commandId });
  }

  throw new RoleException();
};
