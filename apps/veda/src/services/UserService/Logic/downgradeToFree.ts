import { userApis } from '../apis';

export const downgradeToFreeService = async () => {
  const response = await userApis.plan.userApi.downgradeToFree();
  return response;
};
