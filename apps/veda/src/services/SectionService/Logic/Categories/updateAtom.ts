import { sectionApiController } from 'services/SectionService';
import { SectionCategoryTag } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateCategoryOfAtom = async (category: SectionCategoryTag) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.category.updateCategoryOfAtom({ category });
  }
  if (role === 'dev') {
    return sectionApiController.atom.devApi.category.updateCategoryOfDraft({ category });
  }
  throw new RoleException();
};
