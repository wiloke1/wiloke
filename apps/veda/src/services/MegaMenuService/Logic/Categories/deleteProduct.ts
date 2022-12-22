import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteCategoryOfProduct = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.category.deleteCategoryOfProduct({ commandId });
  }
  throw new RoleException();
};
