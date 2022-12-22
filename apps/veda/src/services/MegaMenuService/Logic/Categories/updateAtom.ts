import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionCategoryTag } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateCategoryOfAtom = async (category: SectionCategoryTag) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.category.updateCategoryOfAtom({ category });
  }
  throw new RoleException();
};
