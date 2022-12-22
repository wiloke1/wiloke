import { watchCreateUserPlan } from './store/sagas/watchCreateUserPlan';
import { watchGetUserPlans } from './store/sagas/watchGetPlans';
import { watchDeletePlan } from './store/sagas/watchDeletePlan';
import { watchUpdateUserPlan } from './store/sagas/watchUpdateUserPlan';
import { watchGoToShopifyPayment } from './store/sagas/watchGoToShopifyPayment';
import { watchDowngradeToFree } from './store/sagas/watchDowngradeToFree';
import { watchGetCoupons } from './store/sagas/watchGetCoupons';
import { watchCreateCoupon } from './store/sagas/watchCreateCoupon';
import { watchUpdateCoupon } from './store/sagas/watchUpdateCoupon';
import { watchDeleteCoupon } from './store/sagas/watchDeleteCoupon';
import { watchValidateCoupon } from './store/sagas/watchValidateCoupon';

export * from './PlanManagement';

export const sagasPlanManagement = [
  watchCreateUserPlan,
  watchGetUserPlans,
  watchDeletePlan,
  watchUpdateUserPlan,
  watchGoToShopifyPayment,
  watchDowngradeToFree,
  watchGetCoupons,
  watchCreateCoupon,
  watchUpdateCoupon,
  watchDeleteCoupon,
  watchValidateCoupon,
];
