import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';

export const deleteAtomSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.deleteAtom({ commandId });
  }
  throw new RoleException();
};
