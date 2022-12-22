import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createListMegaMenuOfDraft = async (listMegaMenu: DevSection[]) => {
  const { role } = getUserInfo();

  if (role === 'dev') {
    return sectionApiController.atom.devApi.megaMenu.createListMegaMenuOfDraft({
      listMegaMenu: listMegaMenu.map(item => ({ ...item, commandId: undefined })),
    });
  }

  throw new RoleException();
};
