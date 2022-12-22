import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfParentProduct = async (parentCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'dev') {
    return megaMenuApiController.product.devApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'user') {
    return megaMenuApiController.product.userApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  throw new RoleException();
};
