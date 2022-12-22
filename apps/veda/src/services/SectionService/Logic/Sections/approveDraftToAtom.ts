import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const approveDraftToAdmin = async (devCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.sections.approveDraftToAtom({ commandId: devCommandId });
  }
  throw new RoleException();
};
