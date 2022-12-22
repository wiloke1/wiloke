import { downgradeToFree } from './downgradeToFree/downgradeToFree';
import { redirectToShopifyPayment } from './redirectToShopifyPayment/redirectToShopifyPayment';
import { verifyAfterUpdatePlan } from './verifyAfterUpdatePlan/verifyAfterUpdatePlan';
import { getPlans } from './getPlans/getPlans';

export const userApi = {
  downgradeToFree,
  verifyAfterUpdatePlan,
  redirectToShopifyPayment,
  getPlans,
};
