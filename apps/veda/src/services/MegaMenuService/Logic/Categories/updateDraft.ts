import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionCategoryTag } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateCategoryOfDraft = async (category: SectionCategoryTag) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.category.updateCategoryOfDraft({ category });
  }
  throw new RoleException();
};
