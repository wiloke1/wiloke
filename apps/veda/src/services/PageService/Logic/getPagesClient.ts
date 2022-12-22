import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';
import { RequestGetPagesClient } from '../VedaApplication/types';

export const getPagesClient = ({ pageType, enable, label }: RequestGetPagesClient) => {
  const { id } = getUserInfo();
  return pageApis.vedaApplication.userApi.page.getClients({ type: 'GET FIRST PAGE', pageType, enable, label, userId: id });
};
