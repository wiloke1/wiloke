import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectAtom = async (commandId: string, devId?: number, comment?: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.rejectAtom({ commandId, devId, comment });
  }
  throw new RoleException();
};
