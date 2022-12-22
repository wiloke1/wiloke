import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteCategoryOfAtom = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.category.deleteCategoryOfAtom({ commandId });
  }
  if (role === 'dev') {
    return sectionApiController.atom.devApi.category.deleteCategoryOfDraft({ commandId });
  }
  throw new RoleException();
};
