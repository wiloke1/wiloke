import { userApis } from '../apis';

export const verifyAfterUpdatePlanService = async ({ chargeId }: { chargeId: string }) => {
  const response = await userApis.plan.userApi.verifyAfterUpdatePlan({ chargeId });
  return response;
};
