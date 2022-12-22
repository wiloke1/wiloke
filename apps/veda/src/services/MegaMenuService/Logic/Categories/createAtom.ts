import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createCategoryOfAtom = async ({ description, name }: { name: string; description: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.category.createCategoryOfAtom({ category: { description, name } });
  }
  throw new RoleException();
};
