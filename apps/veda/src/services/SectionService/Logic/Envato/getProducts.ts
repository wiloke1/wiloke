import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProducts = () => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.product.adminApi.envato.getCategories();
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.envato.getCategories();
  }
  if (role === 'user') {
    return sectionApiController.product.userApi.envato.getCategories();
  }

  throw new RoleException();
};
