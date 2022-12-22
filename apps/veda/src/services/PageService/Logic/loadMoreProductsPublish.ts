import { PageType } from 'types/Page';
import { pageApis } from '../apis';

interface RequestParams {
  pageType?: PageType;
  label?: string;
  categoryId?: string;
  cursor: string;
  saved?: boolean;
}

export const loadMorePagesPublish = ({ pageType, label, categoryId, cursor, saved }: RequestParams) => {
  return pageApis.vedaApplication.publishApi.page.getProducts({ type: 'LOADMORE', categoryId, pageType, label, cursor, saved });
};
