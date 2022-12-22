import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectDraft = async (devSection: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.updateDraftOfDev({ section: { ...devSection, status: 'pending' } });
  }
  throw new RoleException();
};
