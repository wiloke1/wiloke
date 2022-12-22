import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteCategoryOfProduct = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.category.deleteCategoryOfProduct({ commandId });
  }
  throw new RoleException();
};
