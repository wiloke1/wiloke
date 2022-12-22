import { sectionApiController } from 'services/SectionService';
import { SectionCategoryTag } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateCategoryOfProduct = async (category: SectionCategoryTag) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.category.updateCategoryOfProduct({ category });
  }
  throw new RoleException();
};
