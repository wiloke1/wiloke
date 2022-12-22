import { megaMenuApiController } from 'services/MegaMenuService';
import { DevSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createDraftSection = async (section: ToPartialKeys<DevSection, 'commandId'>) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.mega_menu.createDraftOfDev({ section });
  }
  throw new RoleException();
};
