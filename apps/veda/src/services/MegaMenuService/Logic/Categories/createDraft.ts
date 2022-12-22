import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createCategoryOfDraft = async ({ description, name }: { name: string; description: string }) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.category.createCategoryOfDraft({ category: { description, name } });
  }
  throw new RoleException();
};
