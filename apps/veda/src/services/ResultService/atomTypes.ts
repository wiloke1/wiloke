import { PageType, Plan, PreviewImage } from 'types/Page';
import { CssVariables, LayoutSettings, PageSettings } from 'types/Result';
import { SectionCategoryTag } from 'types/Sections';

export interface DevPageDatabase {
  commandId: string;
  parentCommandId?: string;
  label: string;
  image: PreviewImage;
  userId: number;
  sectionCommandIds: string[];
  type: PageType;
  pageSettings: CreateUpdateAtomPageSettings;
  status: 'draft' | 'pending';
  /** Message issue của admin */
  comment?: string;
  /** Message commit của dev */
  changelog?: string;
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
}

export interface AdminPageDatabase {
  commandId: string;
  label: string;
  type: PageType;
  image: PreviewImage;
  approvedBy?: number;
  createdBy?: number;
  sectionCommandIds: string[];
  pageSettings: CreateUpdateAtomPageSettings;
  comment?: string;
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
  userId: number;
}

export interface ProductPageDatabase {
  commandId: string;
  parentCommandId: string;
  label: string;
  image: PreviewImage;
  sectionCommandIds: string[];
  type: PageType;
  pageSettings: CreateUpdateAtomPageSettings;
  comment?: string;
  tags?: SectionCategoryTag[];
  category?: SectionCategoryTag;
  plan: Plan;
  downloadedCount: number;
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
}

// ATOMS
export interface DevAtomPageDataResponse extends DevPageDatabase {}

export interface AdminAtomPageDataResponse extends AdminPageDatabase {}

export interface GetAtomPageResponse {
  info: DevAtomPageDataResponse | AdminAtomPageDataResponse;
  message: string;
}

export interface CreateUpdateAtomPageSettings extends PageSettings {
  /** Tất cả các biến colors và fonts */
  cssVariables: CssVariables;
  /** Settings layout như container, column */
  layoutSettings: LayoutSettings;
}

// DEV PAGE
export interface CreateUpdateDevPageParams {
  commandId: string;
  pageSettings: CreateUpdateAtomPageSettings;
  label: string;
  parentCommandId?: string;
  image: PreviewImage;
  userId: number;
  sectionCommandIds: string[];
  addonCommandIds?: string[];
  type: PageType;
  comment: string;
  status: 'draft' | 'pending';
}

export interface CreateUpdateDevPageResponse {
  message: string;
  info: DevAtomPageDataResponse;
}

// ADMIN PAGE
export interface CreateUpdateAdminPageParams {
  commandId: string;
  pageSettings: CreateUpdateAtomPageSettings;
  label: string;
  image: PreviewImage;
  type: PageType;
  comment: string;
  approvedBy?: number;
  createdBy?: number;
  sectionCommandIds: string[];
  addonCommandIds?: string[];
}

export interface CreateUpdateAdminPageResponse {
  message: string;
  info: AdminAtomPageDataResponse;
}

export interface GetAtomPagesResponse {
  info: AdminAtomPageDataResponse[] | DevAtomPageDataResponse[];
  message: string;
}
