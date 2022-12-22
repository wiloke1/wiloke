import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfProduct = async (addonCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.product.adminApi.changelogs.getChangelogsOfProduct({ addonCommandId });
  }
  if (role === 'dev') {
    return addonApiController.product.devApi.changelogs.getChangelogsOfProduct({ addonCommandId });
  }
  if (role === 'user') {
    return addonApiController.product.userApi.changelogs.getChangelogsOfProduct({ addonCommandId });
  }
  throw new RoleException();
};
