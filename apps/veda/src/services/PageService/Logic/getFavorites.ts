import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';
import { BE_PageProduct } from '../VedaApplication/types';

interface ResponseSuccess {
  info: BE_PageProduct[];
  message: string;
}

interface Params {
  name?: string;
}

export const getPageFavorites = async ({ name }: Params): Promise<ResponseSuccess> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await pageApis.vedaApplication.adminApi.page.getFavorites({ type: 'Get first page', name });

    return {
      message: response.message,
      info: response.info ? ((response.info.map(item => ({ ...item, label: item.name, type: item.pageType })) as unknown) as BE_PageProduct[]) : [],
    };
  } else {
    const response = await pageApis.vedaApplication.userApi.page.getFavorites({ type: 'Get first page', name });
    return {
      message: response.message,
      info: response.info ? ((response.info.map(item => ({ ...item, label: item.name, type: item.pageType })) as unknown) as BE_PageProduct[]) : [],
    };
  }
};

interface LoadMoreParams {
  name?: string;
  cursor: string;
}
export const loadMorePagesFavorites = async ({ cursor, name }: LoadMoreParams) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await pageApis.vedaApplication.adminApi.page.getFavorites({ type: 'Load more', name, cursor });

    return {
      message: response.message,
      info: response.info ? ((response.info.map(item => ({ ...item, label: item.name, type: item.pageType })) as unknown) as BE_PageProduct[]) : [],
    };
  } else {
    const response = await pageApis.vedaApplication.userApi.page.getFavorites({ type: 'Load more', name, cursor });
    return {
      message: response.message,
      info: response.info ? ((response.info.map(item => ({ ...item, label: item.name, type: item.pageType })) as unknown) as BE_PageProduct[]) : [],
    };
  }
};
