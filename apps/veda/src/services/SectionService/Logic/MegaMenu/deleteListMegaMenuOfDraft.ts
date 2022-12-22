import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteListMegaMenuOfDraft = ({ listIds }: { listIds: string[] }) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.megaMenu.deleteListMegaMenuOfDraft({ listIds });
  }
  throw new RoleException();
};
