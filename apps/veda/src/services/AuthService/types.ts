export interface SiteStatus {
  siteStatus: 'MAINTAIN' | 'ANNOUNCEMENT' | 'LIVE';
  description?: string;
  heading?: string;
  happenAt: number; // dùng timestamp utc + 0
}

export interface ServerResponseAuthService {
  info: {
    id: number;
    token: string;
    type: string;
    username: string;
    name: string;
    email: string;
    shopId: string | null;
    shopName: string;
    themeName: string | null;
    roles: Role[];
    siteStatus: null | SiteStatus;
    themeId: string;
    plan?: ResponseUserPlan;
  };
  message: string;
}

export type UserRole = 'SUPPER_ADMIN' | 'ADMIN_GLOBAL' | 'SUPPORT_GLOBAL' | 'DEV_PRIVATE' | 'USER_PRIVATE';

interface Role {
  id: number;
  name: UserRole;
}

export interface ResponseUserPlan {
  chargeId: number;
  planHandle: string;
  trialDays: number;
  userId: number;
  createdDateGMT?: string;
}
