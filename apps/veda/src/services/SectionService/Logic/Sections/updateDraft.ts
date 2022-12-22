import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateDraftSection = async (section: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.sections.updateDraftOfDev({ section });
  }
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.updateDraftOfDev({ section });
  }
  throw new RoleException();
};
