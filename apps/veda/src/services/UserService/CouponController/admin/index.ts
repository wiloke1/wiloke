import { createCoupon } from './createCoupon';
import { deleteCoupon } from './deleteCoupon';
import { getCoupon } from './getCoupon';
import { getCoupons } from './getCoupons';
import { updateCoupon } from './updateCoupon';
import { validateCoupon } from './validateCoupon';
import { getCampaign } from './getCampaign';

export const adminApi = {
  updateCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
  createCoupon,
  validateCoupon,
  getCampaign,
};
