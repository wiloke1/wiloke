import { ThemeAddon } from 'types/Addons';
import { PageGeneral } from 'types/Page';
import { PageData, PageSettings } from 'types/Result';
import { PageSection } from 'types/Sections';

// todo: liệu product page có trả về userId ??
export interface PageResponse extends PageGeneral {
  userId: number;
  pageSettings: PageSettingsResponse;
  sectionCommandIds: string[];
  addonCommandIds: string[];
  addons: ThemeAddon[];
  files: PageData['files'];
  modifiedDateTimestamp: number;
  modifiedDateGMT: string;
  justDisabledPages?: string[];
  parentCommandId: string;
}

export interface ServerResponsePageService {
  info: PageResponse;
  message: string;
}

export interface PageSettingsResponse extends PageSettings {}

export interface UpdatePageParams {
  label: string;
  handle: string;
  sections: PageSection[];
  files: any[];
  type: string;
  enable: boolean;
  userId: string;
}

export interface UpdatePageResponse {
  id: string;
  message: string;
}

export interface CreateUpdatePageParams {
  files: PageData['files'];
  data: PageData['data'];
  builderType: 'theme' | 'page';
}

export type RequestResult = any;
