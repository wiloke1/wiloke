import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfProduct = async (sectionCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  if (role === 'dev') {
    return megaMenuApiController.product.devApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  if (role === 'user') {
    return megaMenuApiController.product.userApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  throw new RoleException();
};
