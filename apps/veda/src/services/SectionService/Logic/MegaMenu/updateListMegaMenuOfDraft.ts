import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateListMegaMenuOfDraft = async (listMegaMenu: DevSection[]) => {
  const { role } = getUserInfo();

  if (role === 'dev') {
    const responses = await Promise.all(
      listMegaMenu.map(megaMenu => {
        return sectionApiController.atom.devApi.megaMenu.updateMegamenuOfDraft({ megamenu: megaMenu });
      }),
    );
    return responses.map(({ info }) => info);
  }

  throw new RoleException();
};
