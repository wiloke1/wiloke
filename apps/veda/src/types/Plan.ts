import { PageType } from './Page';

export interface UserPlan {
  commandId: string;
  name: string;
  handle: string;
  price: number;
  yearlyPrice: number;
  trialDays: number;
  pageTypes: PageType[];
  numberOfSections: number;
  numberOfPages: number;
  description?: string;
  allowedThemeAtomCommandIds?: string[];
  createdDateTimestamp?: number;
  modifiedDateTimestamp?: number;
}
