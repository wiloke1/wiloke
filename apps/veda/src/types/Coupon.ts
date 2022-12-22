export interface CU_Coupon {
  commandId: string;
  code: string;
  applyTo: string[];
  /** html **/
  description: string;
  type: 'FIXED' | 'TRAILING' | 'START_WITH_ONE_DOLLAR' | 'PERCENTAGE';
  /** Phần trăm discount */
  number: number;
  /** Hạn dùng discount, bắn lên timestamp */
  expiredOn: number;
}

export interface Coupon extends Omit<CU_Coupon, 'expiredOn'> {
  expiredOn: Date | string;
}
