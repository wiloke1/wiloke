import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateMegaMenuOfDraft = async (devSection: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.megaMenu.updateMegamenuOfDraft({ megamenu: devSection });
  }
  throw new RoleException();
};
