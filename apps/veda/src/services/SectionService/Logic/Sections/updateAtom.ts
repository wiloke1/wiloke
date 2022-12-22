import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateAtomSection = async (section: AdminSection) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.updateAtom({ section: section as AdminSection });
  }
  throw new RoleException();
};
