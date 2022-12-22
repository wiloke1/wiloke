import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';

export const deleteDraftSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.sections.deleteDraftOfDev({ commandId });
  }
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.deleteDraftOfDev({ commandId });
  }
  throw new RoleException();
};
