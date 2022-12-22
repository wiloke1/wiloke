import { BE_PageClient } from 'services/PageService/VedaApplication/types';

export interface ServerResponseAdminPage {
  info: AdminPageData[];
  message: string;
}

export interface AdminPageData extends BE_PageClient {}

export type FilterTypePage = 'all' | 'publish' | 'draft';

export interface UpdateStatusPageRequest {
  id: string;
  enable: boolean;
  adminPageData: AdminPageData;
  callback?: (data: AdminPageData) => void;
  onFulfill: () => void;
}

export interface UpdateStatusPageSuccess {
  id: string;
  enable: boolean;
  justDisabledPages?: string[];
  modifiedDateTimestamp?: number;
}

export interface UpdateStatusPageFailure {
  id: string;
}
