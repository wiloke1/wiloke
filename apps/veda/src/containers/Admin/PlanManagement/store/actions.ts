import { Coupon } from 'types/Coupon';
import { UserPlan } from 'types/Plan';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const createUserPlan = createAsyncAction([
  '@Manager/createUserPlan/request',
  '@Manager/createUserPlan/success',
  '@Manager/createUserPlan/failure',
])<{ data: Omit<UserPlan, 'commandId'>; onFulfill?: () => void }, UserPlan, undefined>();

export const deleteUserPlan = createAsyncAction([
  '@Manager/deleteUserPlan/request',
  '@Manager/deleteUserPlan/success',
  '@Manager/deleteUserPlan/failure',
])<{ commandId: string }, { commandId: string }, { commandId: string }>();

export const getUserPlans = createAsyncAction(['@Manager/getUserPlans/request', '@Manager/getUserPlans/success', '@Manager/getUserPlans/failure'])<
  undefined,
  { data: UserPlan[] },
  undefined
>();

export const updateUserPlan = createAsyncAction([
  '@Manager/updateUserPlan/request',
  '@Manager/updateUserPlan/success',
  '@Manager/updateUserPlan/failure',
])<UserPlan, UserPlan, UserPlan>();

export const goToShopifyPayment = createAsyncAction([
  '@Plan/goToShopifyPayment/request',
  '@Plan/goToShopifyPayment/success',
  '@Plan/goToShopifyPayment/failure',
])<
  { coupon: string; planHandle: string; returnUrl: string; yearly: boolean; onFulfill?: (url: string) => void },
  { confirmation_url: string; planHandle: string },
  { planHandle: string }
>();

export const downgradeToFreePlan = createAsyncAction([
  '@Plan/downgradeToFreePlan/request',
  '@Plan/downgradeToFreePlan/success',
  '@Plan/downgradeToFreePlan/failure',
])<
  { planHandle: string; returnUrl: string; onFulfill?: (url: string) => void },
  { confirmation_url: string; planHandle: string },
  { planHandle: string }
>();

export const getCoupons = createAsyncAction(['@Plan/getCoupons/request', '@Plan/getCoupons/success', '@Plan/getCoupons/failure'])<
  undefined,
  Coupon[],
  undefined
>();

export const createCoupon = createAsyncAction(['@Plan/createCoupon/request', '@Plan/createCoupon/success', '@Plan/createCoupon/failure'])<
  { coupon: Coupon; onFulFill?: () => void },
  Coupon,
  undefined
>();

export const updateCoupon = createAsyncAction(['@Plan/updateCoupon/request', '@Plan/updateCoupon/success', '@Plan/updateCoupon/failure'])<
  Coupon,
  Coupon,
  { commandId: string }
>();

export const deleteCoupon = createAsyncAction(['@Plan/deleteCoupon/request', '@Plan/deleteCoupon/success', '@Plan/deleteCoupon/failure'])<
  { commandId: string },
  { commandId: string },
  { commandId: string }
>();

export const validateCoupon = createAsyncAction(['@Plan/validateCoupon/request', '@Plan/validateCoupon/success', '@Plan/validateCoupon/failure'])<
  { couponCode: string; planHandle: string },
  Coupon,
  undefined
>();

export const useCreateUserPlan = createDispatchAsyncAction(createUserPlan);
export const useDeleteUserPlan = createDispatchAsyncAction(deleteUserPlan);
export const useGetUserPlans = createDispatchAsyncAction(getUserPlans);
export const useUpdateUserPlan = createDispatchAsyncAction(updateUserPlan);
export const useGoToShopifyPayment = createDispatchAsyncAction(goToShopifyPayment);
export const useDowngradeToFreePlan = createDispatchAsyncAction(downgradeToFreePlan);
export const useGetCoupons = createDispatchAsyncAction(getCoupons);
export const useCreateCoupon = createDispatchAsyncAction(createCoupon);
export const useUpdateCoupon = createDispatchAsyncAction(updateCoupon);
export const useDeleteCoupon = createDispatchAsyncAction(deleteCoupon);
export const useValidateCoupon = createDispatchAsyncAction(validateCoupon);
