import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfParentProduct = async (parentCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.product.adminApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'dev') {
    return addonApiController.product.devApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'user') {
    return addonApiController.product.userApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  throw new RoleException();
};
