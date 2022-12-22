import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';
import { RequestGetPagesClient } from '../VedaApplication/types';

export const loadMorePagesClient = ({ pageType, enable, label, lastCursor }: RequestGetPagesClient & { lastCursor: string }) => {
  const { role, id } = getUserInfo();
  // if (role === 'admin') {
  //   return pageApis.vedaApplication.adminApi.page.getProducts({ type: 'LOADMORE', cursor: lastCursor, pageType, enable, label });
  // }
  if (role === 'user' || role === 'admin' || role === 'dev') {
    return pageApis.vedaApplication.userApi.page.getClients({ type: 'LOADMORE', lastCursor, pageType, enable, label, userId: id });
  }
  throw new RoleException();
};
