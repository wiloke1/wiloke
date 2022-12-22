import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const getPageCounterService = async () => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return pageApis.vedaApplication.adminApi.page.getCoutner();
  }
  if (role === 'user') {
    return pageApis.vedaApplication.userApi.page.getCoutner();
  }

  throw new RoleException();
};
