import { PageResponse } from 'services/ResultService';

export interface ResponseTemplatePage {
  info: ResponseTemplatePageData[];
  message: string;
}

export interface ResponseTemplatePageData extends PageResponse {
  description?: string;
}
