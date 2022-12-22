import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createCategoryOfProduct = async ({ description, name }: { description: string; name: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.category.createCategoryOfProduct({ category: { description, name } });
  }
  throw new RoleException();
};
