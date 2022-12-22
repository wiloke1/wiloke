import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getMegaMenuOfDraft = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.megaMenu.getMegamenuOfDraft({ commandId });
  }
  throw new RoleException();
};
