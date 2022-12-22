import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionCategoryTag } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateCategoryOfProduct = async (category: SectionCategoryTag) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.category.updateCategoryOfProduct({ category });
  }
  throw new RoleException();
};
