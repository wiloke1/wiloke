import { createPlan } from './createPlan/createPlan';
import { deletePlan } from './deletePlan/deletePlan';
import { getPlans } from './getPlans/getPlans';
import { updatePlan } from './updatePlan/updatePlan';

export const adminApi = {
  createPlan,
  updatePlan,
  getPlans,
  deletePlan,
};
