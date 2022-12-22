import { PageType } from 'types/Page';
import { pageApis } from '../apis';

interface RequestGetFirstParams {
  pageType?: PageType;
  label?: string;
  categoryId?: string;
  saved?: boolean;
}

export const getPagesPublish = ({ pageType, label, categoryId, saved }: RequestGetFirstParams) => {
  return pageApis.vedaApplication.publishApi.page.getProducts({ type: 'GET FIRST PAGE', categoryId, pageType, label, saved });
};
