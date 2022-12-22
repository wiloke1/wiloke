import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createAtomSection = async (section: ToPartialKeys<AdminSection, 'commandId'>) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.createAtom({ section });
  }
  throw new RoleException();
};
