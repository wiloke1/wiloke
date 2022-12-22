import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfProduct = async (sectionCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  if (role === 'user') {
    return sectionApiController.product.userApi.changelogs.getChangelogsOfProduct({ sectionCommandId });
  }
  throw new RoleException();
};
