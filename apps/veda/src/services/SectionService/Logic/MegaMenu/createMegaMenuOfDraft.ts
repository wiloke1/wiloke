import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createMegaMenuOfDraft = async (devSection: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.megaMenu.createMegamenuOfDraft({ megamenu: { ...devSection, commandId: undefined } });
  }
  throw new RoleException();
};
