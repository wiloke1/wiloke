import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfParentProduct = async (parentCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  if (role === 'user') {
    return sectionApiController.product.userApi.changelogs.getChangelogsOfParentProduct({ parentCommandId });
  }
  throw new RoleException();
};
